import React, { useRef, useState } from 'react';
import { Upload, X, Link, ImageIcon } from 'lucide-react';

interface ImageUploaderProps {
  /** Called when an image is ready (file upload or URL). Returns the URL/path. */
  onImageReady: (url: string) => void;
  label?: string;
  compact?: boolean;
}

export default function ImageUploader({ onImageReady, label, compact = false }: ImageUploaderProps) {
  const [dragging, setDragging] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState('');
  const [mode, setMode] = useState<'file' | 'url'>('file');
  const fileRef = useRef<HTMLInputElement>(null);

  const doUpload = async (file: File) => {
    setUploading(true);
    const token = localStorage.getItem('iliaseul_admin_token') || '';
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      setPreview(data.url);
      onImageReady(data.url);
    } catch (err) {
      alert('სურათის ატვირთვა ვერ მოხდა. სცადეთ URL.');
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) doUpload(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) doUpload(file);
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;
    setPreview(urlInput.trim());
    onImageReady(urlInput.trim());
    setUrlInput('');
  };

  return (
    <div className="space-y-3">
      {label && (
        <label className="block text-[10px] text-stone-500 uppercase tracking-widest">
          {label}
        </label>
      )}

      {/* Mode toggle */}
      <div className="flex rounded-lg overflow-hidden border border-stone-700 w-fit">
        <button
          type="button"
          onClick={() => setMode('file')}
          className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 transition-colors ${
            mode === 'file' ? 'bg-amber-500 text-stone-950' : 'bg-stone-800 text-stone-400 hover:bg-stone-700'
          }`}
        >
          <Upload size={11} /> ფაილი
        </button>
        <button
          type="button"
          onClick={() => setMode('url')}
          className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 transition-colors ${
            mode === 'url' ? 'bg-amber-500 text-stone-950' : 'bg-stone-800 text-stone-400 hover:bg-stone-700'
          }`}
        >
          <Link size={11} /> URL
        </button>
      </div>

      {mode === 'file' ? (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileRef.current?.click()}
          className={`${compact ? 'h-24' : 'h-36'} border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all select-none ${
            dragging ? 'border-amber-400 bg-amber-400/5' : 'border-stone-700 hover:border-stone-500 bg-stone-950/40'
          }`}
        >
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          {uploading ? (
            <div className="text-amber-400 text-xs animate-pulse">იტვირთება...</div>
          ) : (
            <>
              <Upload size={compact ? 18 : 24} className="text-stone-500 mb-1" />
              <span className="text-xs text-stone-400">დააჭირეთ ან გადმოაგდეთ სურათი</span>
              <span className="text-[10px] text-stone-600 mt-0.5">PNG, JPG, WEBP · max 10MB</span>
            </>
          )}
        </div>
      ) : (
        <form onSubmit={handleUrlSubmit} className="flex gap-2">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://..."
            className="flex-1 bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-xs text-white placeholder:text-stone-600 focus:outline-none focus:border-amber-500"
          />
          <button
            type="submit"
            className="px-3 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold rounded-xl transition-colors"
          >
            დამატება
          </button>
        </form>
      )}

      {/* Preview */}
      {preview && (
        <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-stone-700 bg-stone-900">
          <img src={preview} alt="preview" className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={() => { setPreview(''); }}
            className="absolute top-1.5 right-1.5 p-1 bg-stone-900/80 rounded-full text-stone-300 hover:text-red-400"
          >
            <X size={12} />
          </button>
          <div className="absolute bottom-0 left-0 right-0 px-2 py-1 bg-stone-950/70 text-[10px] text-stone-400 truncate flex items-center gap-1">
            <ImageIcon size={10} /> {preview}
          </div>
        </div>
      )}
    </div>
  );
}
