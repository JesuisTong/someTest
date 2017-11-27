# 获得权限
chmod 755 $0
pwd=$1

yum install -y curl
yum install -y vim

# 安装shadowsocks
yum install -y python-pip
pip install shadowsocks

# 创建config文件
export IP=`curl ifconfig.me`
echo "
{
    \"server\": \"$IP\",
    \"server_port\": 8388,  
    \"local_address\": \"127.0.0.1\",  
    \"local_port\": 1080,  
    \"password\": \"${pwd}\",
    \"timeout\": 4000,  
    \"method\":\"aes-256-cfb\"
}
" > /etc/shadowsocks.json

# 加入开机自启动
echo "ssserver -c /etc/shadowsocks.json -d start" >> /etc/rc.local

# 停止防火区
systemctl stop firewalld.service
# 禁止下次开机启动
systemctl disable firewalld.service

yum install iptables-services
systemctl enable iptables
systemctl start iptables 
service iptables save 

# 允许本地访问本地
iptables -A INPUT -i lo -j ACCEPT
# 允许ping
iptables -A INPUT -p icmp -m icmp --icmp-type 8 -j ACCEPT
# 允许ftp
iptables -A INPUT -p tcp -m tcp --dport 20 -j ACCEPT
# 允许sftp
iptables -A INPUT -p tcp -m tcp --dport 21 -j ACCEPT
# 允许ssh
iptables -A INPUT -p tcp -m tcp --dport 22 -j ACCEPT
# 80 http
iptables -A INPUT -p tcp -m tcp --dport 80 -j ACCEPT
# 443 https
iptables -A INPUT -p tcp -m tcp --dport 443 -j ACCEPT
iptables -A INPUT -m state --state RELATED,ESTABLISHED -j ACCEPT
# shadowsocks
iptables -A INPUT -p tcp -m tcp --dport 8388 -j ACCEPT
service iptables save 
systemctl restart iptables 

# 启动BBR，加快http请求、响应
wget --no-check-certificate https://github.com/teddysun/across/raw/master/bbr.sh
chmod +x bbr.sh
./bbr.sh
