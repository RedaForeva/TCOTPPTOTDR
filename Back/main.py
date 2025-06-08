from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates

app = FastAPI()
templates = Jinja2Templates(directory="templates")

@app.get("/", response_class=HTMLResponse)
async def read_index(request: Request):
    items = ["Item 1", "Item 2", "Item 3"]
    return templates.TemplateResponse("index.html", {"request": request, "items": items})