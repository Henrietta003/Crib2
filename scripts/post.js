const postModal = document.getElementById('postModal');
  const openModalButtons = document.querySelectorAll('.openPostModal');
  const closeModal = document.getElementById('closeModal');
  const submitPost = document.getElementById('submitPost');
  const postContent = document.getElementById('postContent');
  const postImage = document.getElementById('postImage');
  const feed = document.querySelector('section.md\\:col-span-6');

  // Open modal buttons (desktop + mobile FAB)
  openModalButtons.forEach(btn => btn.addEventListener('click', () => {
    postModal.classList.remove('hidden');
  }));

  // Close modal
  closeModal.addEventListener('click', () => {
    postModal.classList.add('hidden');
  });

  // Submit post
  submitPost.addEventListener('click', () => {
    const content = postContent.value.trim();
    if (!content && !postImage.files.length) {
      alert('Please add text or image.');
      return;
    }

    const postDiv = document.createElement('div');
    postDiv.className = 'bg-white rounded-xl shadow overflow-hidden mb-6';

    // Optional image
    let imgHTML = '';
    if (postImage.files.length > 0) {
      const reader = new FileReader();
      reader.onload = function(e) {
        postDiv.innerHTML = `
          <div class="p-4 flex items-start space-x-3">
            <img src="profile.jpg" class="w-10 h-10 rounded-full border-2 border-purple-500">
            <div class="flex-1">
              <h4 class="font-semibold">You</h4>
              <p class="text-sm text-gray-700 mt-1">${content}</p>
              <img src="${e.target.result}" class="mt-3 w-full h-64 object-cover rounded-lg">
            </div>
          </div>
        `;
      }
      reader.readAsDataURL(postImage.files[0]);
    } else {
      postDiv.innerHTML = `
        <div class="p-4 flex items-start space-x-3">
          <img src="profile.jpg" class="w-10 h-10 rounded-full border-2 border-purple-500">
          <div class="flex-1">
            <h4 class="font-semibold">You</h4>
            <p class="text-sm text-gray-700 mt-1">${content}</p>
          </div>
        </div>
      `;
    }

    // Insert at the top of the feed
    feed.prepend(postDiv);

    // Reset and close modal
    postContent.value = '';
    postImage.value = '';
    postModal.classList.add('hidden');
  });