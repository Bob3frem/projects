// document.addEventListener('DOMContentLoaded', function() {
//   const container = document.querySelector('.docs__content');
//   const width = container.offsetWidth;
//   const height = container.offsetHeight;

//   // Создаем стейдж
//   const stage = new Konva.Stage({
//     container: 'docs__content', // Исправлен идентификатор контейнера
//     width: width,
//     height: height
//   });

//   // Создаем слой
//   const layer = new Konva.Layer();
//   stage.add(layer);

//   // Загружаем изображение
//   const imageObj = new Image();
//   imageObj.onload = function() {
//     // Вычисляем соотношение масштабирования
//     const scaleX = width / imageObj.width;
//     const scaleY = height / imageObj.height;
//     const scale = Math.min(scaleX, scaleY);

//     const img = new Konva.Image({
//       x: (width - imageObj.width * scale) / 2,
//       y: (height - imageObj.height * scale) / 2,
//       image: imageObj,
//       width: imageObj.width * scale,
//       height: imageObj.height * scale
//     });

//     // Добавляем изображение в слой
//     layer.add(img);
//     layer.draw(); // Перерисовываем слой после добавления изображения
//     addRectangles(); // Добавляем прямоугольники
//   };
//   imageObj.src = '/Письмо1.jpg'; // Путь к вашему изображению

//   function addRectangles() {
//     const rect1 = new Konva.Rect({
//       x: 20,
//       y: 20,
//       width: 100,
//       height: 50,
//       fill: 'red',
//       draggable: true
//     });

//     const rect2 = new Konva.Rect({
//       x: 150,
//       y: 20,
//       width: 100,
//       height: 50,
//       fill: 'blue',
//       draggable: true
//     });

//     layer.add(rect1);
//     layer.add(rect2);
//     layer.draw();
//   }
// });

// window.addEventListener('resize', function() {
//   const newWidth = container.offsetWidth;
//   const newHeight = container.offsetHeight;

//   stage.width(newWidth);
//   stage.height(newHeight);

//   const img = layer.getChildren().find(node => node.className === 'Image');
//   if (img) {
//     const scaleX = newWidth / img.attrs.image.width;
//     const scaleY = newHeight / img.attrs.image.height;
//     const scale = Math.min(scaleX, scaleY);

//     img.width(img.attrs.image.width * scale);
//     img.height(img.attrs.image.height * scale);
//     img.x((newWidth - img.attrs.image.width * scale) / 2);
//     img.y((newHeight - img.attrs.image.height * scale) / 2);
//     layer.draw();
//   }
// });

// document.addEventListener('DOMContentLoaded', function() {
//   const container = document.querySelector('.docs__content');
//   const canvas = document.createElement('canvas');
//   container.appendChild(canvas);
//   const ctx = canvas.getContext('2d');

//   let originalWidth = container.offsetWidth;
//   let originalHeight = container.offsetHeight;

//   const rects = [
//     { x: 0.1, y: 0.1, width: 0.2, height: 0.1, color: 'red', isDragging: false, isResizing: false },
//     { x: 0.5, y: 0.1, width: 0.2, height: 0.1, color: 'blue', isDragging: false, isResizing: false }
//   ];

//   const imageObj = new Image();
//   imageObj.onload = function() {
//     draw();
//   };
//   imageObj.src = '/Письмо1.jpg';

//   const setCanvasSize = () => {
//     canvas.width = container.offsetWidth;
//     canvas.height = container.offsetHeight;
//     updateRects();
//     draw();
//   };
//   setCanvasSize();

//   function updateRects() {
//     const scaleWidth = canvas.width / originalWidth;
//     const scaleHeight = canvas.height / originalHeight;
//     rects.forEach(rect => {
//       rect.scaledX = rect.x * canvas.width;
//       rect.scaledY = rect.y * canvas.height;
//       rect.scaledWidth = rect.width * canvas.width;
//       rect.scaledHeight = rect.height * canvas.height;
//     });
//   }

//   function draw() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     drawImageScaled(imageObj, ctx);
//     rects.forEach(rect => {
//       ctx.fillStyle = rect.color;
//       ctx.fillRect(rect.scaledX, rect.scaledY, rect.scaledWidth, rect.scaledHeight);
//       // Добавление маркера для изменения размера
//       if (rect.isResizing || rect.isDragging) {
//         ctx.fillStyle = 'green';
//         ctx.fillRect(rect.scaledX + rect.scaledWidth - 10, rect.scaledY + rect.scaledHeight - 10, 10, 10);
//       }
//     });
//   }

//   function drawImageScaled(img, ctx) {
//     const canvasRatio = canvas.width / canvas.height;
//     const imageRatio = img.width / img.height;
//     let newWidth, newHeight, newX, newY;
//     if (imageRatio < canvasRatio) {
//       newHeight = canvas.height;
//       newWidth = img.width * (newHeight / img.height);
//       newX = (canvas.width - newWidth) / 2;
//       newY = 0;
//     } else {
//       newWidth = canvas.width;
//       newHeight = img.height * (newWidth / img.width);
//       newX = 0;
//       newY = (canvas.height - newHeight) / 2;
//     }
//     ctx.drawImage(img, newX, newY, newWidth, newHeight);
//   }

//   canvas.addEventListener('mousedown', function(e) {
//     const mouseX = e.clientX - canvas.getBoundingClientRect().left;
//     const mouseY = e.clientY - canvas.getBoundingClientRect().top;
//     rects.forEach(rect => {
//       if (mouseX > rect.scaledX + rect.scaledWidth - 10 && mouseX < rect.scaledX + rect.scaledWidth &&
//           mouseY > rect.scaledY + rect.scaledHeight - 10 && mouseY < rect.scaledY + rect.scaledHeight) {
//         rect.isResizing = true;
//       } else if (mouseX >= rect.scaledX && mouseX <= rect.scaledX + rect.scaledWidth &&
//                  mouseY >= rect.scaledY && mouseY <= rect.scaledY + rect.scaledHeight) {
//         rect.isDragging = true;
//         rect.dragOffsetX = mouseX - rect.scaledX;
//         rect.dragOffsetY = mouseY - rect.scaledY;
//       }
//     });
//   });

//   canvas.addEventListener('mousemove', function(e) {
//     const mouseX = e.clientX - canvas.getBoundingClientRect().left;
//     const mouseY = e.clientY - canvas.getBoundingClientRect().top;
//     rects.forEach(rect => {
//       if (rect.isResizing) {
//         const newWidth = mouseX - rect.scaledX;
//         const newHeight = mouseY - rect.scaledY;
//         if (newWidth > 0 && newHeight > 0 && mouseX <= canvas.width && mouseY <= canvas.height) {
//           rect.scaledWidth = newWidth;
//           rect.scaledHeight = newHeight;
//         }
//       } else if (rect.isDragging) {
//         const newX = mouseX - rect.dragOffsetX;
//         const newY = mouseY - rect.dragOffsetY;
//         if (newX >= 0 && newY >= 0 && newX + rect.scaledWidth <= canvas.width && newY + rect.scaledHeight <= canvas.height) {
//           rect.scaledX = newX;
//           rect.scaledY = newY;
//         }
//       }
//     });
//     draw();
//   });

//   canvas.addEventListener('mouseup', function() {
//     rects.forEach(rect => {
//       if (rect.isDragging || rect.isResizing) {
//         rect.x = rect.scaledX / canvas.width;
//         rect.y = rect.scaledY / canvas.height;
//         rect.width = rect.scaledWidth / canvas.width;
//         rect.height = rect.scaledHeight / canvas.height;
//         rect.isDragging = false;
//         rect.isResizing = false;
//         draw();
//       }
//     });
//   });

//   window.addEventListener('resize', setCanvasSize);
// });



// document.addEventListener('DOMContentLoaded', function() {
//   const container = document.querySelector('.docs__content');
//   const canvas = document.querySelector('.canvas');
//   const ctx = canvas.getContext('2d');

//   const rects = [
//     { id: 1, x: 100, y: 130, width: 150, height: 30, stroke: '#1A1A1A', isDragging: false, isResizing: false },
//     { id: 2, x: 200, y: 50, width: 150, height: 30, stroke: '1A1A1A', isDragging: false, isResizing: false }
//   ];

//   const imageObj = new Image();
//   imageObj.onload = function() {
//     draw();
//   };
//   imageObj.src = 'Письмо1.jpg';

//   const setCanvasSize = () => {
//     canvas.width = container.offsetWidth;
//     canvas.height = container.offsetHeight;
//     draw();
//   };
//   setCanvasSize();

//   function draw() {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     drawImageScaled(imageObj, ctx);
//     rects.forEach(rect => {
//       ctx.strokeStyle = rect.selectedForDeletion ? '#FF0000' : rect.stroke;
//       ctx.lineWidth = 3;
//       ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
//       // Добавление маркера для изменения размера
//       if (rect) {
//         ctx.strokeStyle = '#000';
//         ctx.strokeRect(rect.x + rect.width - 5, rect.y + rect.height - 5, 10, 10);
//         ctx.fillStyle = '#FFF';
//         ctx.fillRect(rect.x + rect.width - 5, rect.y + rect.height - 5, 10, 10);
//       }
//     });
//     updateTable();
//   }

//   function updateTable() {
//     const tableBody = document.getElementById('rectsTable').getElementsByTagName('tbody')[0];
//     tableBody.innerHTML = ""; // Очистка текущего содержимого таблицы

//     rects.forEach(rect => {
//         const row = tableBody.insertRow();
//         const idCell = row.insertCell();
//         idCell.textContent = rect.id;

//         const xCell = row.insertCell();
//         xCell.textContent = `${Math.round(rect.x)}px`; // Форматирование для читабельности

//         const yCell = row.insertCell();
//         yCell.textContent = `${Math.round(rect.y)}px`;

//         const widthCell = row.insertCell();
//         widthCell.textContent = `${Math.round(rect.width)}px`;

//         const heightCell = row.insertCell();
//         heightCell.textContent = `${Math.round(rect.height)}px`;
//     });
//   }

//   function drawImageScaled(img, ctx) {
//     const canvasRatio = canvas.width / canvas.height;
//     const imageRatio = img.width / img.height;
//     let newWidth, newHeight, newX, newY;
//     if (imageRatio < canvasRatio) {
//       newHeight = canvas.height;
//       newWidth = img.width * (newHeight / img.height);
//       newX = (canvas.width - newWidth) / 2;
//       newY = 0;
//     } else {
//       newWidth = canvas.width;
//       newHeight = img.height * (newWidth / img.width);
//       newX = 0;
//       newY = (canvas.height - newHeight) / 2;
//     }
//     ctx.drawImage(img, newX, newY, newWidth, newHeight);
//   }

//   canvas.addEventListener('mousedown', function(e) {
//     const mouseX = e.clientX - canvas.getBoundingClientRect().left;
//     const mouseY = e.clientY - canvas.getBoundingClientRect().top;
//     rects.forEach(rect => {
//       if (mouseX > rect.x + rect.width - 10 && mouseX < rect.x + rect.width &&
//           mouseY > rect.y + rect.height - 10 && mouseY < rect.y + rect.height) {
//         rect.isResizing = true;
//       } else if (mouseX >= rect.x && mouseX <= rect.x + rect.width &&
//                 mouseY >= rect.y && mouseY <= rect.y + rect.height) {
//         rect.isDragging = true;
//         rect.dragOffsetX = mouseX - rect.x;
//         rect.dragOffsetY = mouseY - rect.y;
//       }
//     });
//   });

//   canvas.addEventListener('mousemove', function(e) {
//     const mouseX = e.clientX - canvas.getBoundingClientRect().left;
//     const mouseY = e.clientY - canvas.getBoundingClientRect().top;
//     rects.forEach(rect => {
//       if (rect.isResizing) {
//         const newWidth = mouseX - rect.x;
//         const newHeight = mouseY - rect.y;
//         if (newWidth > 0 && newHeight > 0) {
//           rect.width = newWidth;
//           rect.height = newHeight;
//         }
//       } else if (rect.isDragging) {
//         const newX = mouseX - rect.dragOffsetX;
//         const newY = mouseY - rect.dragOffsetY;
//         if (newX >= 0 && newY >= 0 && newX + rect.width <= canvas.width && newY + rect.height <= canvas.height) {
//           rect.x = newX;
//           rect.y = newY;
//         }
//       }
//     });
//     draw();
//   });

//   canvas.addEventListener('mouseup', function() {
//     rects.forEach(rect => {
//       rect.isDragging = false;
//       rect.isResizing = false;
//       draw();
//     });
//   });

//   window.addEventListener('resize', setCanvasSize);

//   const saveBtn = document.querySelector('.btns__save');

//   saveBtn.addEventListener('click', function() {
//     saveRectCoords();
//   });

//   function saveRectCoords() {
//     const saveRects = rects.map((rect, index) => ({
//       id: index + 1,
//       x: rect.x,
//       y: rect.y,
//       width: rect.width,
//       height: rect.height
//     }));

//     const saveRectsJSON = JSON.stringify(saveRects);
//     console.log(saveRectsJSON)
//   }

//   const addBtn = document.querySelector('.btns__add');
//   addBtn.addEventListener('click', addRect);

//   function addRect() {
//     const newRect = {
//       id: rects.length + 1, // Присваивание уникального ID
//       x: Math.floor(Math.random() * canvas.width / 3), // Примерные начальные координаты
//       y: Math.floor(Math.random() * canvas.height / 3),
//       width: 100,
//       height: 30,
//       stroke: '#1A1A1A',
//       isDragging: false,
//       isResizing: false
//     };
  
//     rects.push(newRect);
//     draw(); // Перерисовка канваса
//   }
  
//   const deleteBtn = document.querySelector('.btns__delete');
//   deleteBtn.addEventListener('click', function() {
//     const indexToRemove = rects.findIndex(rect => rect.selectedForDeletion);
//     if (indexToRemove !== -1) {
//       rects.splice(indexToRemove, 1);
//       draw();
//     }
//   });

//   canvas.addEventListener('dblclick', function(e) {
//     const mouseX = e.clientX - canvas.getBoundingClientRect().left;
//     const mouseY = e.clientY - canvas.getBoundingClientRect().top;
    
//     rects.forEach(rect => {
//       if (
//         mouseX >= rect.x && mouseX <= rect.x + rect.width &&
//         mouseY >= rect.y && mouseY <= rect.y + rect.height
//       ) {
//         rect.selectedForDeletion = !rect.selectedForDeletion;
//       } else {
//         rect.selectedForDeletion = false;
//       }
//     });
//     draw();
//   });
// });

document.addEventListener('DOMContentLoaded', async function() {
  const container = document.querySelector('.docs__content');
  const canvas = document.querySelector('.canvas');
  const ctx = canvas.getContext('2d');
  const select = document.getElementById('imageSelect');
  const url = 'https://bob3frem.github.io/projects/radio-wave/img';
  let imageObj = new Image(); // Общий объект изображения

  const rects = [
      { id: 1, x: 100, y: 130, width: 150, height: 30, stroke: '#1A1A1A', isDragging: false, isResizing: false },
      { id: 2, x: 200, y: 50, width: 150, height: 30, stroke: '1A1A1A', isDragging: false, isResizing: false }
  ];

  try {
      const response = await fetch(url);
      const images = await response.json();

      // Заполнение селекта опциями
      images.forEach(img => {
          const option = new Option(img.name, img.url);
          select.add(option);
      });

      // Изменение изображения при выборе из селекта
      select.addEventListener('change', function() {
          updateImage(this.value);
      });
      
      // Начальная загрузка первого изображения, если массив не пуст
      if (images.length > 0) {
          updateImage(images[0].url);
      }
  } catch (error) {
      console.error('Ошибка загрузки изображений:', error);
  }

  function updateImage(src) {
      imageObj.onload = function() {
          draw();
      };
      imageObj.src = src;
  }

  function setCanvasSize() {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
      draw();
  }
  window.addEventListener('resize', setCanvasSize);
  setCanvasSize();

  function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawImageScaled(imageObj, ctx);
      rects.forEach(rect => {
          ctx.strokeStyle = rect.selectedForDeletion ? '#FF0000' : rect.stroke;
          ctx.lineWidth = 3;
          ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
          if (rect) {
              ctx.strokeStyle = '#000';
              ctx.strokeRect(rect.x + rect.width - 5, rect.y + rect.height - 5, 10, 10);
              ctx.fillStyle = '#FFF';
              ctx.fillRect(rect.x + rect.width - 5, rect.y + rect.height - 5, 10, 10);
          }
      });
  }

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
      rects.forEach(rect => {
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
      rects.forEach(rect => {
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
      rects.forEach(rect => {
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

  function saveRectCoords() {
      const saveRects = rects.map((rect, index) => ({
          id: index + 1,
          x: rect.x,
          y: rect.y,
          width: rect.width,
          height: rect.height
      }));

      const saveRectsJSON = JSON.stringify(saveRects);
      console.log(saveRectsJSON)
  }

  const addBtn = document.querySelector('.btns__add');
  addBtn.addEventListener('click', addRect);

  function addRect() {
      const newRect = {
          id: rects.length + 1, // Присваивание уникального ID
          x: Math.floor(Math.random() * canvas.width / 3), // Примерные начальные координаты
          y: Math.floor(Math.random() * canvas.height / 3),
          width: 100,
          height: 30,
          stroke: '#1A1A1A',
          isDragging: false,
          isResizing: false
      };
  
      rects.push(newRect);
      draw(); // Перерисовка канваса
  }
  
  const deleteBtn = document.querySelector('.btns__delete');
  deleteBtn.addEventListener('click', function() {
      const indexToRemove = rects.findIndex(rect => rect.selectedForDeletion);
      if (indexToRemove !== -1) {
          rects.splice(indexToRemove, 1);
          draw();
      }
  });

  canvas.addEventListener('dblclick', function(e) {
      const mouseX = e.clientX - canvas.getBoundingClientRect().left;
      const mouseY = e.clientY - canvas.getBoundingClientRect().top;
      
      rects.forEach(rect => {
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
