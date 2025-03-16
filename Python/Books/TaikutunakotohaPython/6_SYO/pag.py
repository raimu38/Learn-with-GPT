import pyautogui as pag
import time
print(f"Current Mouse Point: {pag.position()}")
pag.moveTo(100,200,duration=0)
print(f"Current Mouse Point: {pag.position()}")
pag.click(button='right')
time.sleep(1)
pag.dragTo(200,300, duration=1)
print(f"Finish")


