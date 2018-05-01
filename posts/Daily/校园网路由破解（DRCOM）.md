## drcom折腾记
发表于 2016-11-07
> 学校为了某种特殊的原因，更新了新的客户端drcom
催生了一波新的路由器破解风波。由于我不在极路由的大众路由器系列。
这边所有材料都要自己去找，虽然也有大神前面探路。

途中看了不少其他版本及一些作者的教程，只有一个感慨：写教程的时候，要认清楚读者，废话太多会影响阅读，把读者当傻逼，读者会感觉你其实也是瞎蒙的。（所有我也算废话多）

### 客户端及原理
这次客户端是5.21P版drcom

主要原理是PPPOE拨号连接网络，然后不断发送心跳包请求来保持连接。

(github)[https://github.com/drcoms/drcom-generic]上其他学校的dalao已经给出了Python的发送心跳包保持的脚本,这个脚本还在和恶势力持续不断的斗争更新。目前版本已经趋近稳定。

### 我们要做的有2件事

- 1.PPPOE拨号
- 2.运行心跳包脚本

### 1.PPPOE拨号：
拨号的最终环境是路由器中的linux环境，但是由于路由器操作没有PC方便，我们先在PC进行测试。拨号成功的表现为：获取到正常的ip，正常上网但是每2分钟左右掉线一次。

拨号的坑：**账号中的换行符要加在前面，这个是通过正常客户端抓包看到的\r\n**

在Windows10上，需要使用PPPoE-Dialerwiki提供的拨号器，或者其他你觉得OK的拨号器。拨号需要账号和密码。

经过wireshark在正常客户端登录过程中的抓包测试

账号为：\r\n学号，密码为正常密码

**部分路由器需要打下面的ppp.sh拨号补丁。然后拨号可以在正常连接中配置。还可以自动重连。**

``` bash
cp /lib/netifd/proto/ppp.sh /lib/netifd/proto/ppp.sh_bak
sed -i '/proto_run_command/i username=`echo -e "$username"`' /lib/netifd/proto/ppp.sh
sed -i '/proto_run_command/i password=`echo -e "$password"`' /lib/netifd/proto/ppp.sh
```
这个补丁先在通过ssh连接路由器后运行，在通过luci登录才有效。

路由器无法拨号的原因：
- 如果你pc端拨号成功，但是路由器上无法拨号，一般是这个补丁的问题，我是根据各种教程前人提供的补丁，大家也可以找别的方案。
- 这个补丁你执行了之后还真不一定打上了。
- 非法的路由器mac地址可能会导致无法拨号（issue上指出的，我也不清楚什算非法）
- 多拨几次。。。

### 2.运行心跳包脚本

脚本的环境为Python2.7

心跳包的坑是：
根据不同的客户端及学校配置的不一样
心跳包config中的server和flag会不一致。
所以要自己手动使用正规客户端去用wireshark抓包，教程在心跳包使用教程wiki中也有。

### win10电脑端测试

安装完Python环境后，**在拨号成功后**，运行脚本，发送心跳包，持续30分钟以上观察网络是否正常。

#### 报错原因：

- 1.drcom正规客户端只是注销了没有关闭，占用了端口
- 2.由于Windows的换行符报错，这个需要用sublime/atom等现代编辑器修改一下
- 3.等等等等
贴上你的正规客户端的抓包和脚本运行的(DALAO)[https://github.com/drcoms/drcom-generic/issues]

### 路由器环境中的大坑 初始化python环境

#### 路由器连接工具
- winscp
- xshell

我开始没有搞清楚，为什么其他人的路由器在测试过程中的时候可以连接网络。后来我发现了，你们都是极路由，本身的ROM包就带有Python环境。

python ipk安装包对不同的CPU和固件中，不一定能完全兼容。
所以你可以搜索一下你自己的ROM固件源是否带有合适的Ipk安装文件，一般你不是什么偏门的都会有，兼容的包只能在固件的源中找libffi,python-mini
当然那些能上网的，就可以opkg update,opkg install

其次，还有一些固件是已经刷好了Python https://github.com/drcoms/drcom-generic/tree/master/openwrt

链接: https://pan.baidu.com/s/1qYaTTgC密码:6sgp
配置完成py环境，在pc端测试通过的情况下，在路由器端当然也是可以正常运行的

**拥有py环境后运行心跳包就可以持续连接网络拉~**

### 开机自启动脚本
``` bash
sed -i '$d' /etc/rc.local
sed -i '$a sleep 15' /etc/rc.local
sed -i '$a 心跳脚本.sh' /etc/rc.local
sed -i '$a exit 0' /etc/rc.local
if [ "$ACTION" = ifup ]; then 
    if [ "${INTERFACE}" = "wan" ] || ["${INTERFACE}" = "pppoe-wan"]; then
        sleep 10 && python /usr/bin/drcom
    fi
fi
```