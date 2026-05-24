import { useEffect, useRef, useState } from 'react';

export default function PostForm({ initialText = '', initialImage = '', onSubmit, onCancel, submitLabel }) {
  const [text, setText] = useState(initialText);
  const [imageData, setImageData] = useState(initialImage);
  const [preview, setPreview] = useState(initialImage);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    setText(initialText);
    setImageData(initialImage);
    setPreview(initialImage);
  }, [initialText, initialImage]);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      setImageData(result);
      setPreview(result);
      setError('');
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImageData('');
    setPreview('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!text.trim() && !imageData) {
      setError('Please add a caption or choose an image before posting.');
      return;
    }
    setError('');
    onSubmit({ text: text.trim(), image: imageData });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
      {error ? <div className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div> : null}
      <label className="block">
        <span className="text-sm font-medium text-slate-700">Post text</span>
        <textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
          rows={5}
          className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-slate-400 focus:bg-white"
          placeholder="Share your thoughts, photos, or memories..."
        />
      </label>

      <div className="space-y-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-slate-700">Upload image</p>
            <p className="mt-1 text-sm text-slate-500">JPG, PNG, or GIF up to 5MB.</p>
          </div>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Choose file
          </button>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        {preview ? (
          <div className="relative rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <img src={preview} alt="Preview" className="h-72 w-full rounded-3xl object-cover" />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-800 shadow-md transition hover:bg-white"
            >
              Remove image
            </button>
          </div>
        ) : null}
      </div>

      <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
        <button
          type="button"
          onClick={onCancel}
          className="w-full rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 sm:w-auto"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="w-full rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 sm:w-auto"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
