const USERS_KEY = 'merabook_users';
const POSTS_KEY = 'merabook_posts';
const CURRENT_USER_KEY = 'merabook_current_user';
let initialized = false;

const initialUsers = [
  {
    id: 'user-demo',
    name: 'Demo User',
    email: 'demo@merabook.com',
    password: 'demo123',
  },
  {
    id: 'user-anna',
    name: 'Anna Patel',
    email: 'anna@merabook.com',
    password: 'anna321',
  },
  {
    id: 'user-raj',
    name: 'Raj Malhotra',
    email: 'raj@merabook.com',
    password: 'raj123',
  },
];

const initialPosts = [
  {
    id: 'post-1',
    authorId: 'user-anna',
    authorName: 'Anna Patel',
    text: 'Excited to share that MeraBook is live! Building this clone helped me learn React, Tailwind, and localStorage workflows.',
    image:
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80',
    createdAt: Date.now() - 1000 * 60 * 60 * 4,
    updatedAt: Date.now() - 1000 * 60 * 60 * 4,
  },
  {
    id: 'post-2',
    authorId: 'user-raj',
    authorName: 'Raj Malhotra',
    text: 'Started my day with a fresh cup of chai and the best coding session yet. Loving the new feed layout in MeraBook!',
    image:
      'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=1200&q=80',
    createdAt: Date.now() - 1000 * 60 * 60 * 2,
    updatedAt: Date.now() - 1000 * 60 * 60 * 2,
  },
  {
    id: 'post-3',
    authorId: 'user-demo',
    authorName: 'Demo User',
    text: 'This is a sample post created automatically so your feed always looks active. Feel free to edit or delete it.',
    image:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
    createdAt: Date.now() - 1000 * 60 * 20,
    updatedAt: Date.now() - 1000 * 60 * 20,
  },
];

function safeParse(value) {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function initializeStorage() {
  if (initialized) {
    return;
  }

  const users = safeParse(localStorage.getItem(USERS_KEY));
  const posts = safeParse(localStorage.getItem(POSTS_KEY));

  if (!Array.isArray(users) || users.length === 0) {
    saveUsers(initialUsers);
  }

  if (!Array.isArray(posts) || posts.length === 0) {
    savePosts(initialPosts);
  }

  initialized = true;
}

export function getUsers() {
  initializeStorage();
  const raw = localStorage.getItem(USERS_KEY);
  return raw ? safeParse(raw) || [] : [];
}

export function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getCurrentUser() {
  const raw = localStorage.getItem(CURRENT_USER_KEY);
  return raw ? safeParse(raw) : null;
}

export function saveCurrentUser(user) {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
}

export function clearCurrentUser() {
  localStorage.removeItem(CURRENT_USER_KEY);
}

export function getPosts() {
  initializeStorage();
  const raw = localStorage.getItem(POSTS_KEY);
  return raw ? safeParse(raw) || [] : [];
}

export function savePosts(posts) {
  localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
}

export function getPostById(id) {
  return getPosts().find((post) => post.id === id) || null;
}

export function addPost(post) {
  const posts = getPosts();
  posts.unshift(post);
  savePosts(posts);
}

export function updatePost(updatedPost) {
  const posts = getPosts().map((post) =>
    post.id === updatedPost.id ? { ...post, ...updatedPost } : post
  );
  savePosts(posts);
}

export function deletePost(postId) {
  const posts = getPosts().filter((post) => post.id !== postId);
  savePosts(posts);
}

export function getUserPosts(userId) {
  return getPosts().filter((post) => post.authorId === userId);
}
