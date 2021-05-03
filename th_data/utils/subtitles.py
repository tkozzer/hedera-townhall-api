from youtube_transcript_api import YouTubeTranscriptApi
from utils.chapters import chapters as c
import json
import os


def transcribe(id):
    try:
        transcript = YouTubeTranscriptApi.get_transcript(id)
        transcript = check_spelling(transcript)
        return transcript
    except Exception:
        print(
            "error: transcription disabled",
        )


def refactor_subtitles(data):
    try:
        for entry in data["entries"]:
            keep_count = 0
            if "chapters" not in entry.keys():
                file = check_for_chapter(entry)
                entry["chapters"] = c.get_chapters(entry, file)
            for chapter in entry["chapters"]:
                text = ""
                for count, subtitle in enumerate(entry["subtitles"][keep_count:]):
                    if subtitle["start"] < chapter["end_time"]:
                        text += f"{subtitle['text'].strip()} "
                    else:
                        text += f"{subtitle['text'].strip()} "
                        keep_count += count
                        keep_count += 1
                        chapter["text"] = text.strip()
                        break
                chapter["text"] = text.strip()
    except Exception as e:
        entry["chapters"] = []
        print("error: ", e)

    return data


def check_for_chapter(entry):
    for file in os.listdir("./utils/chapters"):
        if entry["upload_date"][:6] == file[:6]:
            return file


# Upload a file that has all the common spelling mistakes and find and replace all those misstakes.
# return the new transcript


def check_spelling(transcript):
    with open("./utils/fix_spelling.json", "r") as f:
        wrong_words = json.load(f)

    for entry in transcript:
        for wrong_word in wrong_words:
            entry["text"] = (
                entry["text"].lower().replace(wrong_word, wrong_words[wrong_word])
            )

    return transcript
