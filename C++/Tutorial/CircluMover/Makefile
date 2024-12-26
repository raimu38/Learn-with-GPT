CXX = g++
CXXFLAGS = -Iinclude -std=c++17 -Wall

# Homebrew でインストールした SDL2 のヘッダとライブラリへのパスを指定
# 環境によっては /opt/homebrew が /usr/local になっているかもしれないので注意
INCLUDE_SDL = -I/opt/homebrew/include
LIB_SDL = -L/opt/homebrew/lib -lSDL2

# ソースファイルの指定
SRC = src/main.cpp src/Ball.cpp src/Window.cpp

# オブジェクトファイルは .o に置き換え
OBJ = $(SRC:.cpp=.o)

# 最終的に生成する実行ファイル名
EXEC = BallMover

all: $(EXEC)

$(EXEC): $(OBJ)
	$(CXX) $(CXXFLAGS) -o $@ $^ $(LIB_SDL)

%.o: %.cpp
	$(CXX) $(CXXFLAGS) $(INCLUDE_SDL) -c $< -o $@

clean:
	rm -f src/*.o $(EXEC)