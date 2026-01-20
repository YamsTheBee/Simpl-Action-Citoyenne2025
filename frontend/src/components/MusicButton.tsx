import { useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

const MusicButton = () => {
	const audioRef = useRef<HTMLAudioElement>(null);
	const [isPlaying, setIsPlaying] = useState(false);

	const toggleMusic = () => {
		const audio = audioRef.current;
		if (!audio) return;

		if (isPlaying) {
			audio.pause();
		} else {
			audio.play().catch(() => {});
		}

		setIsPlaying((prev) => !prev);
	};

	return (
		<>
			<audio ref={audioRef} src="/music/UNE-Minute.mp3" loop />

			<button
				type="button"
				onClick={toggleMusic}
				aria-label={isPlaying ? "Couper la musique" : "Activer la musique"}
				className="
					w-10 h-10 rounded-full
					bg-slate-100
					hover:bg-green-100
					flex items-center justify-center
					transition
				"
			>
				{isPlaying ? (
					<Volume2
						className="w-5 h-5 text-green-600"
						aria-hidden="true"
						focusable="false"
					/>
				) : (
					<VolumeX
						className="w-5 h-5 text-slate-700"
						aria-hidden="true"
						focusable="false"
					/>
				)}
			</button>
		</>
	);
};

export default MusicButton;
