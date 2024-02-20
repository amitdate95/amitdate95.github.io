 import {useEffect, useState} from 'react';



  const TitleBar = () => {
  const [isMaximized, setIsMaximised] = useState(false);
  const [window, setWindow] = useState(null);
  useEffect(() => {
    let intervalId = null;
    const init = async () => {
      setWindow((await import('@tauri-apps/api/window')).appWindow);
        const updateMaximizedState = async () => {
        setIsMaximised(await window.isMaximized());
        };
        updateMaximizedState();
        intervalId = setInterval(updateMaximizedState, 500);
    }
    init();
    return () => {
        if(intervalId){
            clearInterval(intervalId);
        }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMinimize = () => {
    window.minimize();
  };

  const handleMaximize = async () => {
    if (isMaximized) {
      await window.unmaximize();
      setIsMaximised(false);
    } else {
      await window.toggleMaximize();
      setIsMaximised(true);
    }
  };

  const handleClose = () => {
      localStorage.removeItem('visibleColumnState');
      window.close();
  };

  return (
    <>
      <div data-tauri-drag-region class="titlebar-pagename">
        <span>Todos Window</span>
        <div class="titlebar-button">
        <svg
          class="titlebar-svg"
          viewBox="0 0 48 48"
          xmlns="http://www.w3.org/2000/svg"
          onKeyDown={handleMinimize}
          onClick={handleMinimize}
        >
          <path
            d="M9 24C9 23.1716 9.67157 22.5 10.5 22.5H37.5C38.3284 22.5 39 23.1716 39 24C39 24.8284 38.3284 25.5 37.5 25.5H10.5C9.67157 25.5 9 24.8284 9 24Z"
          ></path>
        </svg>
      </div>
      <div class="titlebar-button">
        <svg
          class="titlebar-svg"
          viewBox="0 0 48 48"
          xmlns="http://www.w3.org/2000/svg"
          onKeyDown={handleMaximize}
          onClick={handleMaximize}
        >
          {isMaximized ?
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12 12V36H36V12H12ZM11.5 9C10.1193 9 9 10.1193 9 11.5V36.5C9 37.8807 10.1193 39 11.5 39H36.5C37.8807 39 39 37.8807 39 36.5V11.5C39 10.1193 37.8807 9 36.5 9H11.5Z"
            >
            </path>
          :
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M9 18C9 16.3431 10.3431 15 12 15H15V12C15 10.3431 16.3431 9 18 9H36C37.6569 9 39 10.3431 39 12V30C39 31.6569 37.6569 33 36 33H33V36C33 37.6569 31.6569 39 30 39H12C10.3431 39 9 37.6569 9 36V18ZM12 18V36H30V18H12ZM33 18C33 16.3431 31.6569 15 30 15H18V12H36V30H33V18Z"
            >
            </path>
            }
        </svg>
      </div>

      <div
        class="titlebar-button titlebar-button-close"
        style={{cursor: 'not-allowed'}}
      >
        <svg
          class="titlebar-svg"
          viewBox="0 0 48 48"
          xmlns="http://www.w3.org/2000/svg"
          style={{color: 'var(--g40)'}}
          onKeyDown={handleClose}
          onClick={handleClose}
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M36.3659 38.5481C36.9685 39.1506 37.9455 39.1507 38.5481 38.5481C39.1507 37.9455 39.1507 36.9685 38.5481 36.3659L26.1821 23.9999L38.5479 11.6341C39.1505 11.0315 39.1505 10.0545 38.5479 9.45195C37.9453 8.84935 36.9683 8.84935 36.3657 9.45195L23.9999 21.8177L11.6343 9.45212C11.0317 8.84953 10.0547 8.84953 9.45212 9.45212C8.84953 10.0547 8.84953 11.0317 9.45213 11.6343L21.8177 23.9999L9.45195 36.3657C8.84935 36.9683 8.84935 37.9453 9.45195 38.5479C10.0545 39.1505 11.0315 39.1505 11.6341 38.5479L23.9999 26.1821L36.3659 38.5481Z"
          ></path>
        </svg>
      </div>
      </div>
      <div class="titlebar-divider"></div>
    </>
  )
} 

export default TitleBar;
