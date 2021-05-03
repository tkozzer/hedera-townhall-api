def get_chapters(entry, file):

    fname = open(f"./utils/chapters/{file}", "r")

    lines = fname.readlines()

    times = []
    for line in lines:
        fix_line = line.split("-")
        times.append(fix_line[0].strip())

    chapters = []
    for count, line in enumerate(lines):
        fix_line = line.split("-")
        chapters.append(
            {
                "start_time": calculate_time("start", count, times, entry),
                "end_time": calculate_time("end", count, times, entry),
                "title": fix_line[1].strip(),
            }
        )

    return chapters

def calculate_time(type, count, times, entry):
    new_count = count if type == "start" else count + 1
    times_length = len(times)
    if new_count == times_length:
        return entry["duration"]

    sep_time = times[new_count].split(":")
    minute = int(sep_time[0].strip())
    seconds = int(sep_time[1].strip())
    start_time = (minute * 60) + seconds

    return start_time




    
