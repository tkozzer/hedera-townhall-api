from youtube_transcript_api import YouTubeTranscriptApi
from utils import subtitles as s
import youtube_dl as yt


"""
First: Go to youtube and redownload the playlist info

This isn't always necessary, but it will update the view count, likes, dislikes, rating

    * 'th' is short hand for town hall *

"""


def extract_playlist_info():

    ydl_opts = {}

    with yt.YoutubeDL(ydl_opts) as ydl:
        meta = ydl.extract_info(
            "https://www.youtube.com/playlist?list=PLcaTa5RR9SuBxJOYQg4jExxLIzMYTwIlm",
            download=False,
        )

    for entry in meta["entries"]:
        print(f"Transcribing ... id : {entry['id']}")
        transcript = s.transcribe(entry["id"])

        if transcript != None:
            print("Transcribing finished.")
            entry["subtitles"] = transcript
        else:
            entry["subtitles"] = []
        delete_keys(entry)

    s.refactor_subtitles(meta)
    return meta


def delete_keys(entry):
    keys_to_delete = ["formats", "automatic_captions", "requested_formats"]

    for key in keys_to_delete:
        if key in entry:
            del entry[key]
        else:
            print(f"error: {key} not in entry")


if __name__ == "__main__":
    extract_playlist_info()
