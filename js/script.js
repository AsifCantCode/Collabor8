// scripts.js

function upvote(element) {
    const upvotesElement = element.nextElementSibling;
    upvotesElement.textContent = parseInt(upvotesElement.textContent) + 1;
}

function downvote(element) {
    const downvotesElement = element.nextElementSibling.nextElementSibling;
    downvotesElement.textContent = parseInt(downvotesElement.textContent) + 1;
}

function reply(button) {
    const input = button.previousElementSibling;
    const comment = input.value.trim();

    if (comment !== '') {
        const replyContainer = button.parentElement.parentElement;
        const newComment = document.createElement('div');
        newComment.className = 'comment';
        newComment.innerHTML = `<p>${comment}</p>`;

        replyContainer.insertBefore(newComment, replyContainer.lastChild);
        input.value = '';
    }
}
