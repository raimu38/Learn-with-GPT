import socket 

server_socket = socket.socket(socket.AF_BLUETOOTH, socket.SOCK_STREAM, socket.BTPROTO_RFCOMM)
server_socket.bind(("00"))

SOCKE_STREAM
SOCK_DGRAM
SOCK_RAW
SOCK_SWQPACKET
s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
s.bind('0,0,0,0',12344)
s.listen(5)

s = socket.socket(socket.AF_INET6, socket.SOCK_STREAM)
s.bind("::",8080)
s.lesten(5)

s = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)
s.bind("/tmp/mysocket")
s