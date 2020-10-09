import React from 'react';
import okLogo from '../images/Union.png';
import errLogo from '../images/error.png';
function InfoTooltip({ isOpen, logged,handleCloseButton}) {
  return (
    <div className={`info-tooltip ${isOpen ? 'info-tooltip_opened' : ''}`}>
      <div className="info-tooltip__container">
        <img src={logged ? okLogo : errLogo} alt='Логотип' className="info-tooltip__logo" />
        <p className="info-tooltip__title">{logged ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</p>
        <button type="button" aria-label="Закрыть" className="info-tooltip__cancel-button" onClick={handleCloseButton}> </button>
      </div>
    </div>
  );
}
export default InfoTooltip;