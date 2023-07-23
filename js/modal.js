import { resetScale } from './scale.js';
import {
  init as initEffect,
  reset as resetEffect,
} from './effect.js';

const maxHashtagCount = 5;
const validSymbols = /^#[a-zа-яё0-9]{1,19}$/i;
const errorText = {
  invalidCount: `Максимум ${maxHashtagCount} хэштегов`,
  notUnique: 'Хэштеги должны быть уникальными',
  invalidPattern: 'Неправильный хэштег',
};

const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const overlay = form.querySelector('.ing-upload__overlay');
const cancelButton = form.querySelector('.img-upload__cancel');
const fileField = form.querySelector('.img-upload__input');
const hashtagField = form.querySelector('.text__hashtags');
const commentField = form.querySelector('.text__description');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const showModal = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const hideModal = () => {
  form.reset();
  resetScale();
  resetEffect();
  pristine.reset();
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const isTextFieldFocused = () =>
  document.activeElement === hashtagField || document.activeElement === commentField;

const normalizeTags = (tagString) => tagString.trim().split(' ').filter((tag) => Boolean(tag.length));

const hasValidTags = (value) => normalizeTags(value).every((tag) => validSymbols.test(tag));

const hasValidCount = (value) => normalizeTags(value).length <= maxHashtagCount;

const hasUniqueTags = (value) => {
  const lowerCaseTags = normalizeTags(value).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape' && !isTextFieldFocused()) {
    evt.preventDefault();
    hideModal();
  }
}

const onCancelButtonClick = () => {
  hideModal();
};

const onFileIntputChange = () => {
  showModal();
};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  pristine.validate();
};

pristine.addValidator(
  hashtagField,
  hasValidCount,
  errorText.invalidCount,
  3,
  true
);
pristine.addValidator(
  hashtagField,
  hasUniqueTags,
  errorText.notUnique,
  1,
  true
);
pristine.addValidator(
  hashtagField,
  hasValidTags,
  errorText.invalidPattern,
  2,
  true
);

fileField.addEventListener('change', onFileIntputChange);
cancelButton.addEventListener('click', oncanplaythrough);
form.addEventListener('submit', onFormSubmit);
initEffect();
