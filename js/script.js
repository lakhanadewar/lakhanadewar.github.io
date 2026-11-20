// ─── About page ───────────────────────────────────────────────────────────────
// shared.js must be loaded before this file (provides: data, initPage, setupReveal)

function renderProfile() {
  const photo = document.getElementById("profile-photo");
  if (data.profile.photoUrl) {
    photo.innerHTML = `<img src="${data.profile.photoUrl}" alt="${data.profile.name}">`;
  } else {
    photo.textContent = data.profile.name.split(" ").map((w) => w[0]).join("");
  }

  document.getElementById("profile-name").textContent = data.profile.name;
  document.getElementById("profile-role").textContent = data.profile.role;
  document.getElementById("profile-affiliation").textContent = data.profile.affiliation || "";

  const addr = document.getElementById("profile-address");
  if (addr) addr.innerHTML = (data.profile.address || []).map((l, i) =>
    i === 0
      ? `<span><i class="fa-solid fa-location-dot" aria-hidden="true"></i> ${l}</span>`
      : `<span>${l}</span>`
  ).join("<br>");

  const social = document.getElementById("profile-social");
  if (social) {
    social.innerHTML = (data.profile.social || [])
      .map(
        (link) => `<a class="social-link" href="${link.url}" target="_blank" rel="noopener noreferrer"><i class="${link.icon}" aria-hidden="true"></i><span>${link.label}</span></a>`
      )
      .join("");
  }
}

function renderBio() {
  const bio = document.getElementById("about-bio-text");
  if (bio) bio.textContent = data.profile.about;

  const pts = document.getElementById("about-points");
  if (pts) {
    pts.innerHTML = (data.profile.signaturePoints || [])
      .map((p) => `<p class="about-point">${p}</p>`)
      .join("");
  }
}

function renderLatestPostsPreview() {
  const tbody = document.getElementById("posts-preview-body");
  if (!tbody) return;

  const recent = (data.blogs || []).slice(0, 3);
  if (!recent.length) {
    const block = document.getElementById("posts-preview");
    if (block) block.hidden = true;
    return;
  }

  tbody.innerHTML = recent
    .map(
      (post) => `
        <tr>
          <td class="news-date">${post.date}</td>
          <td class="news-item">
            <a href="blog.html">${post.title}</a><span class="post-platform"> · ${post.platform}</span>
          </td>
        </tr>`
    )
    .join("");
}

initPage("About");
renderProfile();
renderBio();
renderLatestPostsPreview();
setupReveal();
