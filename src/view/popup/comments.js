import he from 'he';
import { EMOJIS } from '../../const.js';
import { getCommentDate } from '../../utils/format-date.js';

const getAttributeChecked = (isChecked = false) => {
  return isChecked ? 'checked' : '';
};

const createCommentTemplate = (comment, isDeleting, deleteId) => {
  const {emoji, text, author, date} = comment;

  return (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}">
      </span>
      <div>
        <p class="film-details__comment-text">${text.length !== 0 ? he.encode(text) : ''}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${getCommentDate(date)}</span>
          <button class="film-details__comment-delete" data-id = "${comment.id}" ${isDeleting && deleteId === comment.id  ? 'disabled' : ''}>${isDeleting && deleteId === comment.id ? 'Deleting...' : 'Delete'}</button>
        </p>
      </div>
    </li>`
  );
};

const createEmojiTemplate = (emoji, currentEmoji, isDisabled) => {

  return EMOJIS.map((emoji) => {

    const isEmojiCheck = emoji === currentEmoji;

    return (
      `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji}" value=${emoji} ${getAttributeChecked(isEmojiCheck)} ${isDisabled ? ' disabled' : ''}>
      <label class="film-details__emoji-label" for="emoji-${emoji}">
        <img src="./images/emoji/${emoji}.png" width="30" height="30" alt=${emoji}>
      </label>`
    );
  }).join('');
};

export const createCommentListTemplate = (comments, input) => {
  const { emoji, text, isDeleting, isDisabled, deleteId } = input;

  const commentList = comments.map((comment) => createCommentTemplate(comment, isDeleting, deleteId)).join('');
  const emojiList = createEmojiTemplate(EMOJIS, emoji, isDisabled);

  return (
    `<ul class="film-details__comments-list">
      ${commentList}
    </ul>
    <div class="film-details__new-comment">
      <div class="film-details__add-emoji-label">
      ${emoji !== '' ? `<img src="images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}">` : ''}
      </div>
      <label class="film-details__comment-label">
        <textarea 
          class="film-details__comment-input" 
          placeholder="Select reaction below and write comment here" 
          name="comment"
          ${isDisabled ? ' disabled' : ''}
        >${text.length !== 0 ? he.encode(text) : ''}</textarea>
      </label>
      <div class="film-details__emoji-list">
        ${emojiList}
      </div>
    </div>`
  );
};
