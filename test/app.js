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
document.addEventListener('DOMContentLoaded', function() {
  const container = document.querySelector('.docs__content');
  const canvas = document.createElement('canvas');
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  let originalWidth = container.offsetWidth;
  let originalHeight = container.offsetHeight;

  const rects = [
    { x: 0.1, y: 0.1, width: 0.2, height: 0.1, color: 'red', isDragging: false, isResizing: false },
    { x: 0.5, y: 0.1, width: 0.2, height: 0.1, color: 'blue', isDragging: false, isResizing: false }
  ];

  const imageObj = new Image();
  imageObj.onload = function() {
    draw();
  };
  imageObj.src = '/Письмо1.jpg';

  const setCanvasSize = () => {
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
    updateRects();
    draw();
  };
  setCanvasSize();

  function updateRects() {
    const scaleWidth = canvas.width / originalWidth;
    const scaleHeight = canvas.height / originalHeight;
    rects.forEach(rect => {
      rect.scaledX = rect.x * canvas.width;
      rect.scaledY = rect.y * canvas.height;
      rect.scaledWidth = rect.width * canvas.width;
      rect.scaledHeight = rect.height * canvas.height;
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawImageScaled(imageObj, ctx);
    rects.forEach(rect => {
      ctx.fillStyle = rect.color;
      ctx.fillRect(rect.scaledX, rect.scaledY, rect.scaledWidth, rect.scaledHeight);
      // Добавление маркера для изменения размера
      if (rect.isResizing || rect.isDragging) {
        ctx.fillStyle = 'green';
        ctx.fillRect(rect.scaledX + rect.scaledWidth - 10, rect.scaledY + rect.scaledHeight - 10, 10, 10);
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
      if (mouseX > rect.scaledX + rect.scaledWidth - 10 && mouseX < rect.scaledX + rect.scaledWidth &&
          mouseY > rect.scaledY + rect.scaledHeight - 10 && mouseY < rect.scaledY + rect.scaledHeight) {
        rect.isResizing = true;
      } else if (mouseX >= rect.scaledX && mouseX <= rect.scaledX + rect.scaledWidth &&
                 mouseY >= rect.scaledY && mouseY <= rect.scaledY + rect.scaledHeight) {
        rect.isDragging = true;
        rect.dragOffsetX = mouseX - rect.scaledX;
        rect.dragOffsetY = mouseY - rect.scaledY;
      }
    });
  });

  canvas.addEventListener('mousemove', function(e) {
    const mouseX = e.clientX - canvas.getBoundingClientRect().left;
    const mouseY = e.clientY - canvas.getBoundingClientRect().top;
    rects.forEach(rect => {
      if (rect.isResizing) {
        const newWidth = mouseX - rect.scaledX;
        const newHeight = mouseY - rect.scaledY;
        if (newWidth > 0 && newHeight > 0 && mouseX <= canvas.width && mouseY <= canvas.height) {
          rect.scaledWidth = newWidth;
          rect.scaledHeight = newHeight;
        }
      } else if (rect.isDragging) {
        const newX = mouseX - rect.dragOffsetX;
        const newY = mouseY - rect.dragOffsetY;
        if (newX >= 0 && newY >= 0 && newX + rect.scaledWidth <= canvas.width && newY + rect.scaledHeight <= canvas.height) {
          rect.scaledX = newX;
          rect.scaledY = newY;
        }
      }
    });
    draw();
  });

  canvas.addEventListener('mouseup', function() {
    rects.forEach(rect => {
      if (rect.isDragging || rect.isResizing) {
        rect.x = rect.scaledX / canvas.width;
        rect.y = rect.scaledY / canvas.height;
        rect.width = rect.scaledWidth / canvas.width;
        rect.height = rect.scaledHeight / canvas.height;
        rect.isDragging = false;
        rect.isResizing = false;
        draw();
      }
    });
  });

  window.addEventListener('resize', setCanvasSize);
});
