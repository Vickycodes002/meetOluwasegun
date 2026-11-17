"use client";

import { useEffect, useId, useRef, useState } from "react";

/** Fired when one video turns its sound on, so every other video goes quiet. */
const SOUND_EVENT = "motion:sound";

function SoundIcon({ on }: { on: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 9.5v5h3.5L12 18V6L7.5 9.5H4Z" fill="currentColor" />
      {on ? (
        <>
          <path d="M15.5 9a4.2 4.2 0 0 1 0 6" />
          <path d="M18 6.5a7.8 7.8 0 0 1 0 11" />
        </>
      ) : (
        <>
          <path d="m16 9.5 5 5" />
          <path d="m21 9.5-5 5" />
        </>
      )}
    </svg>
  );
}

/**
 * A looping video that plays when at least a third of it is on screen and
 * pauses when it scrolls away. Clicking the video toggles play and pause.
 *
 * Sound: browsers only allow autoplay when a video is muted, so every video
 * starts silent. The sound button turns the audio on for that video and
 * silences the others, so two never talk over each other.
 *
 * If the file is missing, a "coming soon" slate shows instead. Visitors who
 * ask for reduced motion get a paused video they can start themselves.
 */
export function AutoVideo({
  src,
  poster,
  title,
  className = "",
}: {
  src: string;
  poster?: string;
  title: string;
  className?: string;
}) {
  const id = useId();
  const wrap = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [state, setState] = useState<"idle" | "playing" | "paused" | "missing">("idle");
  const [muted, setMuted] = useState(true);
  // Set when the visitor pauses by hand, so scrolling does not restart it.
  const held = useRef(false);

  useEffect(() => {
    const w = wrap.current;
    const v = video.current;
    if (!w || !v) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // The file can fail before React attaches onError, so check once on mount too.
    const checkMissing = () => {
      if (v.error || v.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) setState("missing");
    };
    checkMissing();
    const late = window.setTimeout(checkMissing, 1500);

    // Start playback. If the browser refuses to autoplay with sound, fall back to silent.
    const start = () => {
      v.play().catch(() => {
        if (v.muted) return;
        v.muted = true;
        setMuted(true);
        v.play().catch(() => {});
      });
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.35) {
          if (!reduce && !held.current) start();
        } else {
          v.pause();
        }
      },
      { threshold: [0, 0.35, 0.7] },
    );
    observer.observe(w);

    // Another video turned its sound on: this one goes quiet.
    const onSound = (e: Event) => {
      if ((e as CustomEvent<string>).detail === id) return;
      v.muted = true;
      setMuted(true);
    };
    window.addEventListener(SOUND_EVENT, onSound);

    return () => {
      observer.disconnect();
      window.clearTimeout(late);
      window.removeEventListener(SOUND_EVENT, onSound);
    };
  }, [id]);

  function togglePlay() {
    const v = video.current;
    if (!v) return;
    if (v.paused) {
      held.current = false;
      v.play().catch(() => {});
    } else {
      held.current = true;
      v.pause();
    }
  }

  function toggleSound() {
    const v = video.current;
    if (!v) return;
    const next = !v.muted;
    v.muted = next;
    setMuted(next);
    if (!next) {
      window.dispatchEvent(new CustomEvent(SOUND_EVENT, { detail: id }));
      // Asking for sound means they want to watch it.
      if (v.paused) {
        held.current = false;
        v.play().catch(() => {});
      }
    }
  }

  const missing = state === "missing";
  const playing = state === "playing";
  const chip = "label inline-flex items-center gap-2 rounded-full px-3 py-2";

  return (
    <div ref={wrap} className={`relative overflow-hidden bg-plum ${className}`}>
      {!missing && (
        <video
          ref={video}
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={title}
          onPlay={() => setState("playing")}
          onPause={() => setState("paused")}
          onError={() => setState("missing")}
          className="h-full w-full object-cover"
        />
      )}

      {missing ? (
        <div className="absolute inset-0 grid place-items-center">
          <div className="text-center">
            <span aria-hidden className="bob mx-auto block h-6 w-6 rounded-full bg-accent" />
            <p className="display mt-4 text-4xl text-paper sm:text-5xl">Reel loading</p>
            <p className="label mt-2 text-paper/60">Coming soon</p>
          </div>
        </div>
      ) : (
        <>
          <button
            type="button"
            onClick={togglePlay}
            data-cursor={playing ? "Pause" : "Play"}
            aria-label={playing ? `Pause ${title}` : `Play ${title}`}
            className="absolute inset-0"
          >
            <span className={`${chip} absolute bottom-5 left-5 bg-ink/80 text-paper`}>
              <span
                aria-hidden
                className={`h-2 w-2 rounded-full ${playing ? "animate-pulse bg-accent" : "bg-paper/50"}`}
              />
              {playing ? "Playing" : "Paused"}
            </span>
          </button>

          <button
            type="button"
            onClick={toggleSound}
            aria-pressed={!muted}
            aria-label={muted ? `Turn sound on for ${title}` : `Mute ${title}`}
            data-cursor={muted ? "Hear it" : "Mute"}
            className={`${chip} absolute bottom-5 right-5 border-[1.5px] border-ink transition-transform hover:-translate-y-0.5 hover:-rotate-2 ${
              muted ? "bg-paper text-ink" : "bg-accent text-ink"
            }`}
          >
            <SoundIcon on={!muted} />
            {muted ? "Sound off" : "Sound on"}
          </button>
        </>
      )}
    </div>
  );
}
