
class Song():
    def __init__(self, title, artist, duration):
        '''Song の初期化

        Args:
            title: (str) タイトル
            artist: (str) 作曲家
            duration: (int) 時間

        '''
        self.title = title 
        self.artist = artist
        self.duration = duration

    def display_info(self):
        title = self.title
        artist = self.artist
        duration = self.duration

        print(f"Title:{title}, Artist:{artist}, Duration:{duration}")

class PlayList():
    def __init__(self, name):
        self.name = name
        self.songs = []

    def add_song(self,song):
        self.songs.append(song)

    def remove_song(self,title):
        for song in self.songs:
            if song.title == title:
                self.songs.remove(song)
                return True
        return False

    def play_all(self):
        songs = self.songs
        print(songs)
        for song in self.songs:
            song.display_info()

    def total_duration(self):
        total_duration = 0
        for song in self.songs:
            total_duration += song.duration
        h = total_duration // 3600
        m = (total_duration % 3600) // 60
        s = total_duration % 60
        print(f"総再生時間は{h}時間{m}分{s}秒")


song1  = Song("備忘録","ヒグチアイ", 429)
song2  = Song("やめるなら今","ヒグチアイ", 300)
song3  = Song("アポリア","サカナクション", 500)

playList  = PlayList("playlist1")
playList.add_song(song1)
playList.add_song(song2)
playList.add_song(song3)

playList.play_all()
playList.total_duration()

if playList.remove_song("長渕"):
    print("削除しました")
else:
    print("指定の曲は存在しません")


if playList.remove_song("備忘録"):
    print("削除しました")
else:
    print("指定の曲は存在しません")


if playList.remove_song("備忘録"):
    print("削除しました")
else:
    print("指定の曲は存在しません")

playList.play_all()

        
