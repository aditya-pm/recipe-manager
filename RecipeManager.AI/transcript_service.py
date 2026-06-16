import re
from youtube_transcript_api import YouTubeTranscriptApi, FetchedTranscript

ytt_api = YouTubeTranscriptApi()


def get_video_id(video_link: str) -> str:
    if re.fullmatch(r"[A-Za-z0-9_-]{11}", video_link):
        return video_link

    match = re.search(
        r"(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})",
        video_link,
    )

    if match is None:
        raise ValueError("Invalid YouTube URL")

    return match.group(1)


def get_transcript(ytt_api: YouTubeTranscriptApi, video_link: str) -> str:
    video_id = get_video_id(video_link)
    fetched_transcript: FetchedTranscript = ytt_api.fetch(video_id)

    return " ".join(snippet.text for snippet in fetched_transcript)
