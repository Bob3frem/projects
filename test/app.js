document.addEventListener('DOMContentLoaded', async function() {
    const container = document.querySelector('.docs__content');
    const canvas = document.querySelector('.canvas');
    const ctx = canvas.getContext('2d');
    const select = document.getElementById('imageSelect');
    const url = '';
    const rectsByImage = {};
  
    try {
        const response = await fetch(url);
        const images = await response.json();
        
        // Заполнение селекта опциями
        images.forEach(img => {
            const option = new Option(img.image_name);
            select.add(option);
            rectsByImage[img.image_name] = [
              { id: 1, x: 100, y: 130, width: 150, height: 30, stroke: '#1A1A1A', isDragging: false, isResizing: false },
              { id: 2, x: 200, y: 50, width: 150, height: 30, stroke: '1A1A1A', isDragging: false, isResizing: false }
            ]
        });
    } catch (error) {
        console.error('Ошибка загрузки изображений:', error);
    }
  
    const imageObj = new Image();
    let currentRects = [];
  
    imageObj.onload = function() {
      draw();
    };
  
    imageObj.src = `${select.options[select.selectedIndex].value}`;
    currentRects = rectsByImage[select.options[select.selectedIndex].value];
  
    select.addEventListener('change', function() {
      const selectedValue = this.value;
      imageObj.src = `${selectedValue}`;
      currentRects = rectsByImage[select.options[select.selectedIndex].value];
      draw();
    })
  
    const setCanvasSize = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
      draw();
    };
    setCanvasSize();
  
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawImageScaled(imageObj, ctx);
      currentRects.forEach(rect => {
        ctx.strokeStyle = rect.selectedForDeletion ? '#FF0000' : rect.stroke;
        ctx.lineWidth = 3;
        ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
        // Добавление маркера для изменения размера
        if (rect) {
          ctx.strokeStyle = '#000';
          ctx.strokeRect(rect.x + rect.width - 5, rect.y + rect.height - 5, 10, 10);
          ctx.fillStyle = '#FFF';
          ctx.fillRect(rect.x + rect.width - 5, rect.y + rect.height - 5, 10, 10);
        }
      });
      updateTable();
    }
  
    function updateTable() {
      const tableBody = document.getElementById('rectsTable').getElementsByTagName('tbody')[0];
      tableBody.innerHTML = ""; // Очистка текущего содержимого таблицы
  
      currentRects.forEach(rect => {
          const row = tableBody.insertRow();
          const idCell = row.insertCell();
          idCell.textContent = rect.id;
  
          const xCell = row.insertCell();
          xCell.textContent = `${Math.round(rect.x)}px`; // Форматирование для читабельности
  
          const yCell = row.insertCell();
          yCell.textContent = `${Math.round(rect.y)}px`;
  
          const widthCell = row.insertCell();
          widthCell.textContent = `${Math.round(rect.width)}px`;
  
          const heightCell = row.insertCell();
          heightCell.textContent = `${Math.round(rect.height)}px`;
  
          // ['x', 'y', 'width', 'height'].forEach(prop => {
          // const cell = row.insertCell();
          // const input = document.createElement('input');
          // input.type = 'number';
          // input.value = rect[prop];
          // input.style.width = "90%";
          // input.style.height = "90%";
          // input.style.border = "none";
          // input.style.outline = "none";
          // input.addEventListener('input', function() {
          // console.log('aa', currentRects[index])
          // if (currentRects[index]) {
          // currentRects[index][prop] = parseInt(this.value);
          // } else {
          // console.log('error', index);
          // }
          // draw();
          // });
          // cell.appendChild(input);
          // })
      });
    }
  
    const table = document.getElementById('rectsTable');
    table.addEventListener('dblclick', function(e) {
      const target = e.target;
      if (target.tagName === 'TD') {
        const row = target.parentNode;
        const rectId = parseInt(row.cells[0].textContent);
        const rect = currentRects.find(rect => rect.id === rectId);
        if (rect) {
          rect.selectedForDeletion = !rect.selectedForDeletion;
          draw();
        }
      }
    })
  
    function drawImageScaled(img, ctx) {
      const canvasRatio = canvas.width / canvas.height;
      const imageRatio = img.width / img.height;
      let newWidth, newHeight, newX, newY;
      if (imageRatio < canvasRatio) {
        newHeight = canvas.height;
        newWidth = img.width * (newHeight / img.height);
        newX = (canvas.width - newWidth) / 2;
        newY = 0;
      } else {
        newWidth = canvas.width;
        newHeight = img.height * (newWidth / img.width);
        newX = 0;
        newY = (canvas.height - newHeight) / 2;
      }
      ctx.drawImage(img, newX, newY, newWidth, newHeight);
    }
  
    canvas.addEventListener('mousedown', function(e) {
        const mouseX = e.clientX - canvas.getBoundingClientRect().left;
        const mouseY = e.clientY - canvas.getBoundingClientRect().top;
        currentRects.forEach(rect => {
            if (mouseX > rect.x + rect.width - 10 && mouseX < rect.x + rect.width &&
                mouseY > rect.y + rect.height - 10 && mouseY < rect.y + rect.height) {
                rect.isResizing = true;
            } else if (mouseX >= rect.x && mouseX <= rect.x + rect.width &&
                mouseY >= rect.y && mouseY <= rect.y + rect.height) {
                rect.isDragging = true;
                rect.dragOffsetX = mouseX - rect.x;
                rect.dragOffsetY = mouseY - rect.y;
            }
        });
    });
  
    canvas.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX - canvas.getBoundingClientRect().left;
        const mouseY = e.clientY - canvas.getBoundingClientRect().top;
        currentRects.forEach(rect => {
            if (rect.isResizing) {
                const newWidth = mouseX - rect.x;
                const newHeight = mouseY - rect.y;
                if (newWidth > 0 && newHeight > 0) {
                    rect.width = newWidth;
                    rect.height = newHeight;
                }
            } else if (rect.isDragging) {
                const newX = mouseX - rect.dragOffsetX;
                const newY = mouseY - rect.dragOffsetY;
                if (newX >= 0 && newY >= 0 && newX + rect.width <= canvas.width && newY + rect.height <= canvas.height) {
                    rect.x = newX;
                    rect.y = newY;
                }
            }
        });
        draw();
    });
  
    canvas.addEventListener('mouseup', function() {
      currentRects.forEach(rect => {
            rect.isDragging = false;
            rect.isResizing = false;
            draw();
        });
    });
  
    window.addEventListener('resize', setCanvasSize);
  
    const saveBtn = document.querySelector('.btns__save');
  
    saveBtn.addEventListener('click', function() {
        saveRectCoords();
    });
  
    // function saveRectCoords() {
    //     const saveRects = currentRects.map((rect, index) => ({
    //         id: index + 1,
    //         name: currentRects,
    //         x: rect.x,
    //         y: rect.y,
    //         width: rect.width,
    //         height: rect.height
    //     }));
  
    //     const saveRectsJSON = JSON.stringify(saveRects);
    //     console.log(saveRectsJSON)
    // }

    function saveRectCoords() {
      const saveRects = {}; // Объект для хранения данных о прямоугольниках для каждой картинки
  
      // Проход по всем картинкам
      Object.keys(rectsByImage).forEach(imageName => {
          const rects = rectsByImage[imageName]; // Получение прямоугольников для текущей картинки
          saveRects[imageName] = rects.map((rect, index) => ({
              id: index + 1,
              x: rect.x,
              y: rect.y,
              width: rect.width,
              height: rect.height
          }));
      });
  
      const saveRectsJSON = JSON.stringify(saveRects);
      textarea.value = saveRectsJSON; // Запись JSON в textarea
  }
  
  function submitForm() {
      const form = document.querySelector('.docs__form');
      form.submit(); // Отправка формы
  }
  
  
    const addBtn = document.querySelector('.btns__add');
    addBtn.addEventListener('click', addRect);
  
    function addRect() {
        const newRect = {
            id: currentRects.length + 1, // Присваивание уникального ID
            x: Math.floor(Math.random() * canvas.width / 3), // Примерные начальные координаты
            y: Math.floor(Math.random() * canvas.height / 3),
            width: 100,
            height: 30,
            stroke: '#1A1A1A',
            isDragging: false,
            isResizing: false
        };
    
        currentRects.push(newRect);
        draw(); // Перерисовка канваса
    }
    
    const deleteBtn = document.querySelector('.btns__delete');
    deleteBtn.addEventListener('click', function() {
        const indexToRemove = currentRects.findIndex(rect => rect.selectedForDeletion);
        if (indexToRemove !== -1) {
          currentRects.splice(indexToRemove, 1);
            draw();
        }
    });
  
    canvas.addEventListener('dblclick', function(e) {
        const mouseX = e.clientX - canvas.getBoundingClientRect().left;
        const mouseY = e.clientY - canvas.getBoundingClientRect().top;
        
        currentRects.forEach(rect => {
            if (
                mouseX >= rect.x && mouseX <= rect.x + rect.width &&
                mouseY >= rect.y && mouseY <= rect.y + rect.height
            ) {
                rect.selectedForDeletion = !rect.selectedForDeletion;
            } else {
                rect.selectedForDeletion = false;
            }
        });
        draw();
    });
  });