"use client";

import { useState } from "react";
import {
  Users, Heart, MessageSquare, Bookmark, Sparkles, MapPin,
  Camera, Plus, Flame, CheckCircle2
} from "lucide-react";
import Link from "next/link";

interface StoryPost {
  id: string;
  author: string;
  avatar: string;
  role: string;
  timeAgo: string;
  title: string;
  location: string;
  content: string;
  image: string;
  category: string;
  likes: number;
  commentsCount: number;
  isLiked: boolean;
  isBookmarked: boolean;
}

const INITIAL_POSTS: StoryPost[] = [
  {
    id: "post-1",
    author: "Ananya Sharma",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80",
    role: "Himalayan Hiker",
    timeAgo: "3 hours ago",
    title: "Sunrise over Pangong Tso: The cold wind was worth every second 🌅",
    location: "Leh Ladakh",
    content: "Woke up at 4:30 AM in sub-zero temperature at 14,000 ft. The gradient of deep blue to warm orange reflecting on the salt lake is a sight I will cherish forever. Make sure to wear triple thermal layers if visiting in October!",
    image: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?w=1200&q=80",
    category: "Story",
    likes: 142,
    commentsCount: 28,
    isLiked: false,
    isBookmarked: true
  },
  {
    id: "post-2",
    author: "Rohan Varma",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    role: "Food & Culture Critic",
    timeAgo: "6 hours ago",
    title: "Secret Street Food Trail in Old Delhi 🍲",
    location: "Chandni Chowk, Delhi",
    content: "Skip the main road restaurants and head straight into Paranthe Wali Gali! Tried Rabri Jalebi at a 120-year-old stall. Total budget for 4 people was under ₹600!",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1200&q=80",
    category: "Food Trail",
    likes: 89,
    commentsCount: 14,
    isLiked: true,
    isBookmarked: false
  },
  {
    id: "post-3",
    author: "Priya Nair",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    role: "Solo Backpacker",
    timeAgo: "1 day ago",
    title: "Floating on Alleppey Backwaters with Local Fishermen 🛶",
    location: "Alleppey, Kerala",
    content: "Rented a wooden canoe instead of a big houseboat for ₹800/day. Navigated tiny village canals that houseboats can't enter. Met local weavers and ate fresh Karimeen fish curry!",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1200&q=80",
    category: "Budget Tip",
    likes: 215,
    commentsCount: 42,
    isLiked: false,
    isBookmarked: true
  }
];

export default function CommunityPage() {
  const [posts, setPosts] = useState<StoryPost[]>(INITIAL_POSTS);
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostTitle, setNewPostTitle] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);

  const toggleLike = (id: string) => {
    setPosts(prev => prev.map(p => p.id === id ? {
      ...p,
      isLiked: !p.isLiked,
      likes: p.isLiked ? p.likes - 1 : p.likes + 1
    } : p));
  };

  const toggleBookmark = (id: string) => {
    setPosts(prev => prev.map(p => p.id === id ? {
      ...p,
      isBookmarked: !p.isBookmarked
    } : p));
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostTitle.trim() || !newPostContent.trim()) return;

    const newPost: StoryPost = {
      id: `post-${Date.now()}`,
      author: "You (Voyager)",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80",
      role: "Verified Voyager",
      timeAgo: "Just now",
      title: newPostTitle,
      location: "India",
      content: newPostContent,
      image: "https://images.unsplash.com/photo-1492816041544-6c902f2a6a3e?w=1200&q=80",
      category: "Story",
      likes: 1,
      commentsCount: 0,
      isLiked: true,
      isBookmarked: false
    };

    setPosts([newPost, ...posts]);
    setNewPostTitle("");
    setNewPostContent("");
    setShowCreateModal(false);
  };

  return (
    <div className="min-h-screen bg-[#05070A] text-white pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto transition-colors duration-300">
      
      {/* Glow background accent */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[280px] bg-[#0DBB7B]/10 blur-[140px] -z-10 rounded-full pointer-events-none" />

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="badge-primary mb-3">
            <Users className="w-3.5 h-3.5 text-[#0DBB7B]" /> Travel Community & Stories
          </div>
          <h1 className="display-hero">
            Voyager <span className="text-[#0DBB7B]">Community</span>
          </h1>
          <p className="body-text max-w-xl mt-2">
            Share authentic travel stories, photos, hidden gem discoveries, and food trails with fellow Indian travelers.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="btn-primary h-12 px-6 shadow-xl cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Share Travel Story
        </button>
      </div>

      {/* Main Feed Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Columns: Feed */}
        <div className="lg:col-span-2 space-y-6">
          {posts.map((post) => (
            <article
              key={post.id}
              className="soft-card p-6 sm:p-8 border border-slate-200 dark:border-white/10 space-y-5"
            >
              {/* Author Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={post.avatar}
                    alt={post.author}
                    className="w-11 h-11 rounded-full object-cover border-2 border-emerald-500/30"
                  />
                  <div>
                    <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                      {post.author}
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    </h3>
                    <span className="text-[11px] font-semibold text-slate-400">
                      {post.role} · {post.timeAgo}
                    </span>
                  </div>
                </div>

                <span className="badge-tag text-[10px] font-black uppercase tracking-wider">
                  {post.category}
                </span>
              </div>

              {/* Title & Location */}
              <div>
                <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 text-xs font-bold mb-1">
                  <MapPin className="w-3.5 h-3.5" /> {post.location}
                </div>
                <h2 className="text-xl font-black text-slate-900 dark:text-white leading-tight">
                  {post.title}
                </h2>
              </div>

              {/* Story Image */}
              {post.image && (
                <div className="relative h-72 sm:h-80 w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              )}

              {/* Paragraph Content */}
              <p className="body-text text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
                {post.content}
              </p>

              {/* Action Bar */}
              <div className="pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => toggleLike(post.id)}
                    className={`flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer ${
                      post.isLiked
                        ? "text-rose-500 font-extrabold"
                        : "text-slate-500 hover:text-rose-500 dark:text-slate-400"
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${post.isLiked ? "fill-rose-500" : ""}`} />
                    <span>{post.likes} Likes</span>
                  </button>

                  <button className="flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer">
                    <MessageSquare className="w-4 h-4" />
                    <span>{post.commentsCount} Comments</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleBookmark(post.id)}
                    className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all cursor-pointer ${
                      post.isBookmarked
                        ? "bg-emerald-500 text-black border-emerald-400"
                        : "bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 border-transparent hover:bg-slate-200"
                    }`}
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>

                  <Link
                    href={`/ai-planner?prompt=${encodeURIComponent("Plan trip based on: " + post.title)}`}
                    className="h-9 px-3.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-extrabold flex items-center gap-1 hover:bg-emerald-500 hover:text-black transition-all border border-emerald-500/20"
                  >
                    <Sparkles className="w-3.5 h-3.5" /> Plan Similar Trip
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Right Sidebar: Trending Topics & Top Contributors */}
        <div className="space-y-6">
          
          <div className="soft-card p-6 border border-slate-200 dark:border-white/10 space-y-4">
            <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-500" /> Trending Topics
            </h3>
            <div className="flex flex-wrap gap-2">
              {["#KeralaBackwaters", "#LadakhRoadtrip", "#OldDelhiFood", "#VaranasiAarti", "#GoaBeaches", "#HampiRuins"].map(tag => (
                <span key={tag} className="badge-tag text-xs font-bold cursor-pointer hover:bg-emerald-500/20 hover:text-emerald-500">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="soft-card p-6 border border-slate-200 dark:border-white/10 space-y-4">
            <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-500" /> Top Community Leaders
            </h3>
            <div className="space-y-3">
              {[
                { name: "Ananya Sharma", badge: "24 Stories · 1.4k Likes", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80" },
                { name: "Rohan Varma", badge: "18 Stories · 980 Likes", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80" },
                { name: "Priya Nair", badge: "15 Stories · 890 Likes", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80" },
              ].map(user => (
                <div key={user.name} className="flex items-center gap-3">
                  <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full object-cover" />
                  <div>
                    <h4 className="text-xs font-black text-slate-900 dark:text-white">{user.name}</h4>
                    <span className="text-[10px] text-slate-400 font-semibold">{user.badge}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Create Story Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
          <div className="bg-white dark:bg-[#0F172A] rounded-[2.5rem] p-6 sm:p-8 max-w-lg w-full border border-slate-200 dark:border-white/10 shadow-2xl space-y-4">
            <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Camera className="w-5 h-5 text-emerald-500" /> Share Your Travel Story
            </h3>
            <form onSubmit={handleCreatePost} className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase text-slate-400 block mb-1">Title / Headline</label>
                <input
                  type="text"
                  value={newPostTitle}
                  onChange={e => setNewPostTitle(e.target.value)}
                  placeholder="e.g. Unforgettable sunset at Amer Fort..."
                  className="input-standard w-full text-xs font-bold"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-slate-400 block mb-1">Your Story & Tips</label>
                <textarea
                  value={newPostContent}
                  onChange={e => setNewPostContent(e.target.value)}
                  placeholder="Share details about budget, secret spots, best time to visit..."
                  className="w-full h-32 p-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="h-10 px-5 rounded-full bg-slate-100 dark:bg-white/10 text-xs font-bold text-slate-600 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-accent h-10 px-6 text-xs">
                  Publish Story
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
