import sys


if __name__ == "__main__":
    import json
    import extract_playlist_info as epi

    print(sys.argv)
    args = sys.argv
    if len(args) > 1 and args[1] == "test": 
         # Testing data file
        filename = "test_data/test.json"
    else:
        filename = "db.json"

   
    
    try:

        data = epi.extract_playlist_info()

        with open(filename, "w") as outfile:
            json.dump(data, outfile, sort_keys=True)

        print(f"{filename} is complete.")
    except Exception as e:
        print(f"error: {e}")
