# class Repository:
#     def fetch_data(self):
#         return "データ"

# class Service:
#     def __init__(self):
#         self.repository = Repository()

#     def do_dosomething(self):
#         data = self.repository.fetch_data()
#         print(data)

# service = Service()
# service.do_dosomething()

class Repostitory:
    def fetch_data(self):
        return "データ"

class Service:
    def __init__(self,repository):
        self.repository = repository

    def do_something(self):
        data = self.repository.fetch_data()
        print(data) 

class DummyReopsitory:
    def fetch_data(self):
        return "dummy data"

def test_service_do_something(capsys):
    dummy_repo = DummyReopsitory()
    service = Service(dummy_repo)
    service.do_something()

    captured = capsys.readouterr()
    assert "dummy data" in captured.out
repo = Repostitory()
service = Service(repo)
service.do_something()


