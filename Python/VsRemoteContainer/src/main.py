import fastapi 
import matplotlib.pyplot as plt

app = fastapi()

@app.get('/')
def getroot():
    return "Hello "
