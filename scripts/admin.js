    // Sidebar toggle on mobile
    const menuBtn = document.getElementById('menuBtn');
    const sidebar = document.getElementById('sidebar');
    menuBtn?.addEventListener('click', () => {
      sidebar.classList.toggle('hidden');
    });