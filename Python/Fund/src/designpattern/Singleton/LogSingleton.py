class Logger:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance  = super(Logger, cls).__new__(cls)
            cls._instance.log = []
        return cls._instance

    def add_Log(self, message:str):
        self.log.append(message)

    def show_logs(self):
        for msg in self.log:
            print(msg)

logger1 = Logger()
logger2 = Logger()

logger1.add_Log("ログ1")
logger2.add_Log("ログ2")

logger1.show_logs()

