import React, { useEffect } from 'react';

const ResizableDiv = () => {
  useEffect(() => {
    const resizableX = () => {
      const resizerX = document.querySelector('.resizer-x');

      resizerX.addEventListener('mousedown', onmousedown);
      resizerX.addEventListener('touchstart', ontouchstart);

      function ontouchstart(e) {
        e.preventDefault();
        resizerX.addEventListener('touchmove', ontouchmove);
        resizerX.addEventListener('touchend', ontouchend);
      }

      function ontouchmove(e) {
        e.preventDefault();
        const clientX = e.touches[0].clientX;
        const deltaX = clientX - (resizerX._clientX || clientX);
        resizerX._clientX = clientX;
        const leftDiv = resizerX.previousElementSibling;
        const rightDiv = resizerX.nextElementSibling;
        
        const leftWidth = parseInt(getComputedStyle(leftDiv).flexBasis);
        const rightWidth = parseInt(getComputedStyle(rightDiv).flexBasis);

        if (deltaX < 0) {
          leftDiv.style.flexBasis = `${leftWidth + deltaX}px`;
          rightDiv.style.flexBasis = `${rightWidth - deltaX}px`;
        }
        if (deltaX > 0) {
          leftDiv.style.flexBasis = `${leftWidth + deltaX}px`;
          rightDiv.style.flexBasis = `${rightWidth - deltaX}px`;
        }
      }

      function ontouchend(e) {
        e.preventDefault();
        resizerX.removeEventListener('touchmove', ontouchmove);
        resizerX.removeEventListener('touchend', ontouchend);
        delete e._clientX;
      }

      function onmousedown(e) {
        e.preventDefault();
        document.addEventListener('mousemove', onmousemove);
        document.addEventListener('mouseup', onmouseup);
      }

      function onmousemove(e) {
        e.preventDefault();
        const clientX = e.clientX;
        const deltaX = clientX - (resizerX._clientX || clientX);
        resizerX._clientX = clientX;
        const leftDiv = resizerX.previousElementSibling;
        const rightDiv = resizerX.nextElementSibling;

        const leftWidth = parseInt(getComputedStyle(leftDiv).flexBasis);
        const rightWidth = parseInt(getComputedStyle(rightDiv).flexBasis);

        if (deltaX < 0) {
          leftDiv.style.flexBasis = `${leftWidth + deltaX}px`;
          rightDiv.style.flexBasis = `${rightWidth - deltaX}px`;
        }
        if (deltaX > 0) {
          leftDiv.style.flexBasis = `${leftWidth + deltaX}px`;
          rightDiv.style.flexBasis = `${rightWidth - deltaX}px`;
        }
      }

      function onmouseup(e) {
        e.preventDefault();
        document.removeEventListener('mousemove', onmousemove);
        document.removeEventListener('mouseup', onmouseup);
        delete e._clientX;
      }
    };

    resizableX();

    return () => {
      // Cleanup logic here...
    };
  }, []);

  return (
    <div id="app" className="w-full h-full">
      <div className="resizable-x h-full">
        <div className="div0 flex-none flex-shrink-0" style={{ flexBasis: '50%' }}>
          <p>div 0</p>
        </div>
        <div className="resizer-x bg-black cursor-col-resize"></div>
        <div className="resizable-y flex flex-col h-full" style={{ flexBasis: '50%' }}>
          <div className="div1 flex-none" style={{ flexBasis: '33.33%' }}>
            <p>div 1</p>
          </div>
          <div className="resizer-y bg-black cursor-row-resize"></div>
          <div className="div2 flex-none" style={{ flexBasis: '66.66%' }}>
            <p>div 2</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResizableDiv;
