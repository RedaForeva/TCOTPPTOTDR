from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

app = FastAPI()

# Указываем директорию для статических файлов
app.mount("/static", StaticFiles(directory="static"), name="static")

# Указываем директорию для шаблонов
templates = Jinja2Templates(directory="templates")

@app.get("/", response_class=HTMLResponse)
async def read_index(request: Request):
    return templates.TemplateResponse("main_menu_project/main_menu_project.html", {"request": request})