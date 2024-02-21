from PIL import Image
import os, math, time
import pprint 
import glob
import re
import shutil
import sys

from typing import Tuple

def get_files_from_dir(dirs):
    allFiles = []
    for dir in dirs:
        for file in os.listdir(dir):
            allFiles.append(file)
    allFiles.sort()
    return allFiles


def get_image_dimensions(img_path) -> Tuple[int,int]:
    try:
        with Image.open(img_path) as im:
            return im.size
    except Exception as e:
        print(current_file + " is not a valid image", e)
        return None

def handleMonsterFaces():
    monsterMap = [
        # Name, image, columns, rows
        ("mushG", "sprite-2-0", 4, 4),
        ("frogG", "sprite-2-23", 5, 4),
        ("beanG", "sprite-2-28", 5, 5),
        ("slimeG", "sprite-2-3",5 ,4),
        ("snakeG", "sprite-2-20",5 ,5),
        ("carrotO", "sprite-2-19",5 ,5),
        ("goblinG", "sprite-2-31",5 ,5),
        ("plank", "sprite-2-42",6 ,6),
        ("frogBIG", "sprite-2-25",6 ,5),
        ("branch", "sprite-2-16",5 ,5),
        ("acorn", "sprite-2-24",5 ,5),
        ("mushW", "sprite-2-1",5 ,4),
        ("mushR", "sprite-2-67",5 ,5),
        ("poopSmall", "sprite-2-7",4 ,4),
        ("ratB", "sprite-2-26",5 ,5),
        # ("poopD", "sprite-2-26",5 ,5), // TODO?
        # World 2
        ("jarSand", "sprite-2-33",5 ,5),
        ("mimicA", "sprite-2-27",6 ,6),
        ("crabcake", "sprite-2-40",5 ,5),
        ("coconut", "sprite-2-39",6 ,6),
        ("sandcastle", "sprite-2-44",6 ,5),
        ("pincermin", "sprite-2-2",5 ,5),
        ("potato", "sprite-2-18",6 ,6),
        ("steak", "sprite-2-49",5 ,5),
        ("moonman", "sprite-2-45",6 ,5), 
        ("sandgiant", "sprite-2-43",6 ,6),
        ("snailZ", "sprite-2-50",7 ,6),
        # World 3
        ("sheep", "sprite-2-79",7 ,6),
        ("flake", "sprite-2-70",6 ,5),
        ("stache", "sprite-2-77",6 ,5),
        ("ram", "sprite-2-83",5 ,5),
        ("bloque", "sprite-2-69",6 ,5),
        ("mamoth", "sprite-2-74",6 ,5),
        ("snowball", "sprite-2-78",6 ,5),
        ("penguin", "sprite-2-72",7 ,6),
        ("thermostat", "sprite-2-32",6,6),
        ("glass", "sprite-2-76",7 ,6),
        ("snakeB", "sprite-2-75",5 ,5),
        ("speaker", "sprite-2-71",6 ,6),
        ("eye", "sprite-2-73",6 ,5),
        ("skele", "sprite-2-80",6 ,6),
        ("skele2", "sprite-2-81",6 ,6),
        # World 4
        ("mushP", "sprite-2-38",6 ,5),
        ("w4a2", "sprite-2-112",6 ,5),
        ("w4a3", "sprite-2-110",6 ,5),
        ("demonP", "sprite-2-34",7 ,7),
        ("w4b2", "sprite-2-107",6 ,5),
        ("w4b1", "sprite-2-114",6 ,5),
        ("w4b3", "sprite-2-113",6 ,5),
        ("w4b4", "sprite-2-108",6 ,5),
        ("w4b5", "sprite-2-111",5 ,4),
        ("w4c1", "sprite-2-109",6 ,5),
        ("w4c2", "sprite-2-115",6 ,6),
        ("w4c3", "sprite-2-116",6 ,5),
        ("w4c4", "sprite-2-117",7 ,6),
        # World 5
        ("w5a1", "sprite-2-136", 5, 5),
        ("w5a2", "sprite-2-137", 5, 5),
        ("w5a3", "sprite-2-138", 6, 5),
        ("w5a4", "sprite-2-139", 5, 5),
        ("w5a5", "sprite-2-140", 5, 5),
        ("w5b1", "sprite-2-142", 5, 5),
        ("w5b2", "sprite-2-143", 5, 4),
        ("w5b3", "sprite-2-144", 6, 5),
        ("w5b4", "sprite-2-145", 5, 5),
        ("w5b5", "sprite-2-146", 6, 5),
        ("w5b6", "sprite-2-147", 5, 5),
        ("w5c1", "sprite-2-148", 5, 5),
        ("w5c2", "sprite-2-149", 5, 4),
        # World 6
        ("w6a1", "sprite-2-158", 6, 5),
        ("w6a2", "sprite-2-159", 6, 6),
        ("w6a3", "sprite-2-160", 6, 6),
        ("w6a4", "sprite-2-161", 6, 6),
        ("w6a5", "sprite-2-162", 6, 5),
        ("w6b1", "sprite-2-163", 6, 6),
        ("w6b2", "sprite-2-164", 6, 6),
        ("w6b3", "sprite-2-165", 7, 7),
        ("w6b4", "sprite-2-166", 6, 6),
        ("w6c1", "sprite-2-167", 6, 6),
        ("w6c2", "sprite-2-168", 6, 6),
        ("w6d1", "sprite-2-169", 6, 5),
        ("w6d2", "sprite-2-170", 5, 5),
        ("w6d3", "sprite-2-171", 7, 7),
        # Crystals
        ("Crystal0", "sprite-2-59",5 ,5),
        ("Crystal1", "sprite-2-61",6 ,5),
        ("Crystal2", "sprite-2-84",6 ,6),
        ("Crystal3", "sprite-2-128",5 ,5),
        ("Crystal4",  "sprite-2-141", 5, 5),
        ("Crystal5",  "sprite-2-172", 5, 5),
        # Mini bosses
        ("mini3a", "sprite-2-129",4 ,3),
        ("mini4a", "sprite-2-130",4 ,4),
        # Pets
        ("Pet0", "sprite-2-118",5 ,5),
        ("Pet1", "sprite-2-119",5 ,5),
        ("Pet2", "sprite-2-120",5 ,5),
        ("Pet3", "sprite-2-121",5 ,4),
        ("Pet4", "sprite-2-122",5 ,4),
        ("Pet5", "sprite-2-123",5 ,5),
        ("Pet6", "sprite-2-124",5 ,4),
        ("Pet7", "sprite-2-125",5 ,5),
        ("Pet8", "sprite-2-126",5 ,4),
        ("Pet9", "sprite-2-133",5 ,4),
        ("Pet10", "sprite-2-134",5 ,4),
        ("Pet11", "sprite-2-135",5 ,4),
        ("steakr", "sprite-2-99",5 ,5),
        ("potatob", "sprite-2-100",6 ,6),
        ("shovelr", "sprite-2-88",6 ,6),
    ]
    
    set_size = 36
    for (name, file, columns, rows) in monsterMap:
        with Image.open(f"data/icons/assets/graphics/1x/{file}.png") as im:
            data = im.getdata()
            w, h = im.size
            image_width = math.floor(w / columns)
            image_height = math.floor(h / rows)
            
            top = 0
            left = 0
            bottom = image_height
            right = image_width

            # if (image_height > set_size or image_width > set_size):

            cut_frame = data.crop((left,top,right,bottom))
            # while cut_frame.size[0] < set_size or cut_frame.size[1] < set_size:
            #     cut_frame = cut_frame.resize([math.floor(s * 1.05) for s in cut_frame.size], Image.ANTIALIAS)
            #print("Original size: ", cut_frame.size, name)
            # while cut_frame.size[0] > set_size or cut_frame.size[1] > set_size:
            #     cut_frame = cut_frame.resize([math.floor(s * 0.95) for s in cut_frame.size], Image.ANTIALIAS)

            image_width, image_height = cut_frame.size
            # Center the image
            # x1 = int(math.floor((set_size - image_width) / 2))
            # y1 = int(math.floor((set_size - image_height) / 2))
            mode = im.mode
            if len(mode) == 1:  # L, 1
                new_background = (255)
            if len(mode) == 3:  # RGB
                new_background = (255, 255, 255)
            if len(mode) == 4:  # RGBA, CMYK
                new_background = (255, 255, 255, 255)

            newImage = Image.new(mode, cut_frame.size)
            newImage.paste(cut_frame, (0, 0, 0 + image_width, 0 + image_height))
            newImage.save(f"data/icons/assets/data/{name.replace(' ', '_').lower()}.png", "PNG")


def handleQuestGivers():
    questMap = [
        # Name, image, columns, rows
        ("Scripticus", "sprite-84-7", 3, 3),
        ("Mr Pigibank", "sprite-84-18", 5, 4),
        ("Town Marble", "sprite-84-3", 1, 1),
        ("Builder Bird", "sprite-84-32",3 ,3),
        ("Grasslands Gary", "sprite-84-13",2 ,2),
        ("Glumlee", "sprite-84-9",3 ,2),
        ("Mutton", "sprite-84-23",3 ,3),
        ("Krunk", "sprite-84-6",3 ,2),
        ("Woodsman", "sprite-84-5",2 ,2),
        ("Picnic Stowaway", "sprite-84-10",4 ,3),
        ("Typhoon", "sprite-84-47",3 ,3),
        ("Hamish", "sprite-84-12",3 ,3),
        ("Promotheus", "sprite-84-28",4 ,4),
        ("Toadstall", "sprite-84-71",3 ,3),
        ("Stiltzcho", "sprite-84-22",3 ,2),
        ("Funguy", "sprite-84-19",4 ,4),
        ("Tiki Chief", "sprite-84-27",3 ,3),
        ("Dog Bone", "sprite-84-34",4 ,4),
        ("Obol Altar", "sprite-84-4",3 ,3),
        ("Papua Piggea", "sprite-84-21",5 ,4),
        ("Sprout", "sprite-84-1",3 ,2),
        ("Dazey", "sprite-84-2",3 ,2),
        ("Telescope", "sprite-84-56",3 ,3),
        ("TP Pete", "sprite-84-0",3 ,2),
        ("Bushlyte", "sprite-84-25",4 ,3),
        ("Rocklyte", "sprite-84-26",3 ,3),
        ("Meel", "sprite-84-48",4 ,3),
        # World 2
        ("Cowbo Jones", "sprite-84-29",5 ,4),
        ("Desert Davey", "sprite-84-33",2 ,2),
        ("Postboy Pablob", "sprite-84-36",5 ,5),
        ("Constructor Crow", "sprite-84-53",3 ,3),
        ("Centurion", "sprite-84-54",4 ,3),
        ("Snake Jar", "sprite-84-46",4 ,3),
        ("Bandit Bob", "sprite-84-43",6 ,5),
        ("Speccius", "sprite-84-35",2 ,2),
        ("XxX Cattleprod XxX", "sprite-84-51",4 ,4), 
        ("Goldric", "sprite-84-16",4 ,4),
        ("Carpetiem", "sprite-84-45",3 ,3),
        ("Loominadi", "sprite-84-30",4 ,3),
        ("Wellington", "sprite-84-49",4 ,3),
        ("Djonnut", "sprite-84-44",4 ,3),
        ("Whattso", "sprite-84-39",1 ,1),
        ("Fishpaste97", "sprite-84-40",4 ,4),
        ("Scubidew", "sprite-84-17",3 ,3),
        ("Gangster Gus", "sprite-84-73",3 ,2),
        ("Cactolyte", "sprite-84-52",5 ,4),
        ("Walupiggy", "sprite-84-70",4 ,4),
        # World 3
        ("Hoggindaz", "sprite-84-55",4 ,4),
        ("Iceland Irwin", "sprite-84-58",2 ,2),
        ("Carpenter Cardinal", "sprite-84-65",3 ,3),
        ("Worldo", "sprite-84-60",5 ,4),
        ("Lord of the Hunt", "sprite-84-66",3 ,2),
        ("Lonely Hunter", "sprite-84-64",3 ,2),
        ("Snouts", "sprite-84-68",3 ,3),
        ("Shuvelle", "sprite-84-62",4 ,4),
        ("Yondergreen", "sprite-84-61",3 ,3),
        ("Crystalswine", "sprite-84-63",1 ,1),
        ("Bill Brr", "sprite-84-20",4 ,4),
        ("Bellows", "sprite-84-59",4 ,3),
        # World 4
        ("Gobo", "sprite-84-78",3 ,3),
        ("Oinkin", "sprite-84-77",4 ,3),
        ("Blobbo", "sprite-84-75",3 ,3),
        ("Capital P", "sprite-84-76",4 ,4),
        ("Nebula Neddy", "sprite-84-79",2 ,2),
        ("Eliteus", "sprite-84-80",4 ,3),
        ("Nebulyte", "sprite-84-87",4 ,3),
        ("Rift Ripper", "sprite-84-86",4 ,4),
        ("Monolith", "sprite-84-90",1 ,1),
        ("Nebulyte", "sprite-84-87",4 ,3, 6), # Need 6th frame (0 indexed, i.e. first frame = 0)
        ("Royal Worm", "sprite-84-91",3 ,2),
        # World 5
        ("Muhmuguh", "sprite-84-84",3 ,3),
        ("Pirate Porkchop", "sprite-84-82",1 ,1),
        ("Poigu", "sprite-84-83",1 ,1),
        ("Slargon", "sprite-84-81",3 ,2),
        ("Lava Larry", "sprite-84-85",2 ,2),
        ("Tired Mole", "sprite-84-89",3 ,3),
        # World 6
        ("Lafu Shi", "sprite-84-92",4 ,4),
        ("Hoov", "sprite-84-93",4 ,4),
        ("Woodlin Elder", "sprite-84-96",3 ,3),
        ("Tribal Shaman", "sprite-84-95",3 ,2),
        ("Sussy Gene", "sprite-84-98",4 ,3),
        ("Legumulyte", "sprite-84-97",4 ,4),
        ("Potti", "sprite-84-94",3 ,3),
        # Events
        ("Loveulyte", "sprite-84-57",4 ,3),
        ("Egggulyte", "sprite-84-67",3 ,3),
        ("Coastiolyte", "sprite-84-69",4 ,4),
        ("Falloween Pumpkin", "sprite-84-74",4 ,4),
        ("Giftmas Blobulyte", "sprite-84-50",3 ,3),
    ]
    
    set_size = 50
    for (name, file, columns, rows, *frame) in questMap:
        # Extract the first frame of the sprite
        targetFrame = 0
        if len(frame) > 0:
            targetFrame = frame[0]
            print(f"Set target frame to {targetFrame} for {name}")

        with Image.open(f"data/icons/assets/graphics/1x/{file}.png") as im:
            data = im.getdata()
            w, h = im.size
            image_width = math.floor(w / columns)
            image_height = math.floor(h / rows)
            

            top = image_height * (math.floor(targetFrame / columns) % rows)
            left = image_width * (targetFrame % columns)
            bottom = top + image_height
            right = left + image_width

            if targetFrame > 0:
                print(f"{top} - {left} - {bottom} - {right} - {targetFrame}/{columns}/{rows}/{image_height}/{image_width}")

            # if (image_height > set_size or image_width > set_size):

            cut_frame = data.crop((left,top,right,bottom))
            resize_count = 0
            while cut_frame.size[0] > 50 or cut_frame.size[1] > 50:
                cut_frame = cut_frame.resize([math.floor(s * 0.95) for s in cut_frame.size], Image.ANTIALIAS)

            image_width, image_height = cut_frame.size
            # Center the image
            x1 = int(math.floor((set_size - image_width) / 2))
            y1 = int(math.floor((set_size - image_height) / 2))
            mode = im.mode
            if len(mode) == 1:  # L, 1
                new_background = (255)
            if len(mode) == 3:  # RGB
                new_background = (255, 255, 255)
            if len(mode) == 4:  # RGBA, CMYK
                new_background = (255, 255, 255, 255)

            newImage = Image.new(mode, (set_size, set_size))
            newImage.paste(cut_frame, (x1, y1, x1 + image_width, y1 + image_height))
            newImage.save(f"data/icons/assets/data/{name.replace(' ', '_').lower()}.png", "PNG")


def handleConstellations():
    dimensions = get_image_dimensions("apk/assets/assets/graphics/1x/sprite-54-41.png")
    tile_width = 36
    tile_height = 36

    w, h = dimensions
    numberOfColumns = w / tile_width
    numberOfRows = h / tile_height

    max_frames_row = 1.0
    spritesheet_width = tile_width * max_frames_row
    required_rows = numberOfRows * numberOfColumns
    spritesheet_height = tile_height * required_rows

    spritesheet = Image.new("RGBA",(int(spritesheet_width), int(spritesheet_height)))
    css_sheet = """.icons-constellations {
background-image: url(spritesheet_constellations.png);
background-repeat: no-repeat;
display: inline-block;
width: 100%;
padding-bottom: 100%;
height: 0;
background-size: cover;
background-position: 0 calc(var(--row) * __PERCENTAGE__%)
}
"""
    image_count = 0
    print(numberOfRows, numberOfColumns)
    prefixes = ["A", "B", "C", "D", "E"]

    with Image.open("apk/assets/assets/graphics/1x/sprite-54-41.png") as im:
        data = im.getdata()
        currentRow = 0
        currentCol = 0
        complete_version = False
        currentConstellation = 0
        prefix = prefixes[0]
        while (currentRow < numberOfRows):
            top = tile_height * math.floor(image_count/max_frames_row)
            left = tile_width * (image_count % max_frames_row)
            bottom = top + tile_height
            right = left + tile_width
        
            box = (left,top,right,bottom)
            box = [int(i) for i in box]
            cut_frame = data.crop((currentCol*tile_width,currentRow*tile_height,currentCol*tile_width + tile_width, currentRow*tile_height + tile_height))
            if (image_count < 24):
                prefix = "A"
            elif (image_count < 46):
                prefix = "B"
            elif (image_count < 67):
                prefix = "C"
            elif (image_count < 88):
                prefix = "D"
            else:
                prefix = "E"
            
            if prefix == "A":
                constNumber = math.floor(1 + image_count / 2)
            elif prefix == "B":
                constNumber = math.floor(1 + image_count / 2 - 12) 
            elif prefix == "C":
                constNumber = math.floor(1 + image_count / 2 - 23) 
            elif prefix == "D":
                 constNumber = math.floor(1 + image_count / 2 - 34)
            elif prefix == "E":
                 constNumber = math.floor(1 + image_count / 2 - 44)
            constName = f"{prefix}-{constNumber}"
            spritesheet.paste(cut_frame, box)
            if (complete_version):
                css_sheet += f".icons-constellation{prefix}{constNumber}_done {{ --row: {image_count}; }}\n"
                currentConstellation += 1
                complete_version = False
                
            else:
                complete_version = True
                css_sheet += f".icons-constellation{prefix}{constNumber} {{ --row: {image_count}; }}\n"
            image_count += 1
            currentCol += 1
            if (currentCol == numberOfColumns):
                currentCol = 0
                currentRow += 1
    css_sheet = css_sheet.replace("__PERCENTAGE__", f"{ 100 / (image_count - 1)}")
    spritesheet.save(f"sprites/spritesheet_constellations.png", "PNG")
    css_file_name = f"sprites/spritesheet_constellations.css"
    with open(css_file_name, "w") as f:
        f.write(css_sheet)
    shutil.copy(f'sprites/spritesheet_constellations.png', f'public/icons/assets/sheets/spritesheet_constellations.png')
    shutil.copy(f'sprites/spritesheet_constellations.css', f'public/icons/assets/sheets/spritesheet_constellations.css')


def handleColo():
    dimensions = get_image_dimensions("data/icons/assets/graphics/1x/sprite-54-28.png")
    tile_width = 127
    tile_height = 104

    w, h = dimensions
    numberOfColumns = math.ceil(w / tile_width)
    numberOfRows = math.ceil(h / tile_height)

    max_frames_row = 1.0
    required_rows = numberOfRows * numberOfColumns

    spritesheet = Image.new("RGBA",(int(36), int(36 * 4)))
    css_sheet = """.icons-colosseums {
background-image: url(spritesheet_colosseums.png);
background-repeat: no-repeat;
display: inline-block;
width: 100%;
padding-bottom: 100%;
height: 0;
background-size: cover;
background-position: 0 calc(var(--row) * __PERCENTAGE__%)
}
"""
    image_count = 0
    with Image.open("data/icons/assets/graphics/1x/sprite-54-28.png") as im:
        data = im.getdata()
        currentRow = 0
        currentCol = 0
        while (currentRow < numberOfRows):
            cut_frame = data.crop((currentCol*tile_width,currentRow*tile_height,currentCol*tile_width + tile_width, currentRow*tile_height + tile_height))
            while cut_frame.size[0] > 36 or cut_frame.size[1] > 36:
                cut_frame = cut_frame.resize([math.floor(s * 0.95) for s in cut_frame.size], Image.ANTIALIAS)

            image_width, image_height = cut_frame.size
            top = 36 * math.floor(image_count/max_frames_row)
            left = 36 * (image_count % max_frames_row)
            bottom = top + image_height
            right = left + image_width
        
            box = (left,top,right,bottom)
            box = [int(i) for i in box]
            spritesheet.paste(cut_frame, box)
            css_sheet += f".icons-colosseums{image_count + 1} {{ --row: {image_count}; }}\n"
            image_count += 1
            currentCol += 1
            if (currentCol == numberOfColumns):
                currentCol = 0
                currentRow += 1
    css_sheet = css_sheet.replace("__PERCENTAGE__", f"{ 100 / (image_count - 1)}")
    spritesheet.save(f"sprites/spritesheet_colosseums.png", "PNG")
    css_file_name = f"sprites/spritesheet_colosseums.css"
    with open(css_file_name, "w") as f:
        f.write(css_sheet)
    shutil.copy(f'sprites/spritesheet_colosseums.png', f'public/icons/assets/sheets/spritesheet_colosseums.png')
    shutil.copy(f'sprites/spritesheet_colosseums.css', f'public/icons/assets/sheets/spritesheet_colosseums.css')

if __name__ == "__main__":
    #handleConstellations()
    handleQuestGivers()
    #handleColo()
    handleMonsterFaces()
    sys.exit(0)
    dimDict = {}
    filesDict = {
        'data/icons/assets/data/': get_files_from_dir(['data/icons/assets/data/']),
        'quest/': get_files_from_dir(['quest/']),
    }
    image_count = 0
    for base_path, files in filesDict.items():  
        for current_file in files:
            dimensions = get_image_dimensions(f"{base_path}{current_file}")
            if not dimensions:
                continue
            w, h = dimensions
            dimstr = f"{w},{h}"
            if (dimstr not in dimDict.keys()):
                dimDict[dimstr] = []
            dimDict[dimstr].append(f"{base_path}{current_file}")
            image_count += 1
    
    for dimension, images in dimDict.items():
        if (len(images) < 5):
            continue

        print(f"Working on {dimension} which has {len(images)} images")
        max_frames_row = 1.0
        frames = []
        tile_width = 0
        tile_height = 0

        spritesheet_width = 0
        spritesheet_height = 0

        for image in images:
            with Image.open(image) as im:
                if im.mode != "RGBA":
                    frames.append((image.replace("data/icons/assets/data/", "").replace("quest/", "").replace("/", "").replace(".png", ""), im.convert("RGBA").getdata()))
                else:
                    frames.append((image.replace("data/icons/assets/data/", "").replace("quest/", "").replace("/", "").replace(".png", ""), im.getdata()))

        if len(frames) < 5:
            continue
        tile_width = frames[0][1].size[0]
        tile_height = frames[0][1].size[1]

        if len(frames) > max_frames_row :
            spritesheet_width = tile_width * max_frames_row
            required_rows = math.ceil(len(frames)/max_frames_row)
            spritesheet_height = tile_height * required_rows
        else:
            spritesheet_width = tile_width*len(frames)
            spritesheet_height = tile_height
            
        spritesheet = Image.new("RGBA",(int(spritesheet_width), int(spritesheet_height)))
        css_sheet = """.icons-__HEIGHTWIDTH__ {
    background-image: url(__SHEETNAME__);
    background-repeat: no-repeat;
    display: inline-block;
    width: 100%;
    padding-bottom: __PADDING__%;
    height: 0;
    background-size: cover;
    background-position: 0 calc(var(--row) * __PERCENTAGE__%)
}
.icons-__HEIGHTWIDTH__:not(.icons-__FIRST_FRAME__):after{content:'MISSING ICON';font-size:12px; line-height: 1em; background:red;color:#fff;height:100%;opacity:calc(1 - var(--row));}
"""
        css_sheet = css_sheet.replace("__SHEETNAME__", f"spritesheet_{dimension.split(',')[0]}x{dimension.split(',')[1]}.png")
        css_sheet = css_sheet.replace("__HEIGHTWIDTH__", f"{dimension.split(',')[0]}{dimension.split(',')[1]}")
        css_sheet = css_sheet.replace("__PADDING__", str((int(dimension.split(',')[1]) / int(dimension.split(',')[0])) * 100))
        image_count = 0
        for frame_name, current_frame in frames:
            top = tile_height * math.floor(image_count/max_frames_row)
            left = tile_width * (image_count % max_frames_row)
            bottom = top + tile_height
            right = left + tile_width
            
            box = (left,top,right,bottom)
            box = [int(i) for i in box]
            cut_frame = current_frame.crop((0,0,tile_width,tile_height))
            spritesheet.paste(cut_frame, box)
            css_sheet += f".icons-{frame_name} {{ --row: {image_count}; }}\n"
            image_count += 1
            if image_count == 1:
                css_sheet = css_sheet.replace("__FIRST_FRAME__", frame_name)
        css_sheet = css_sheet.replace("__PERCENTAGE__", f"{ 100 / (image_count - 1)}")
        spritesheet.save(f"sprites/spritesheet_{dimension.split(',')[0]}x{dimension.split(',')[1]}.png", "PNG")
        css_file_name = f"sprites/spritesheet_{dimension.split(',')[0]}x{dimension.split(',')[1]}.css"
        with open(css_file_name, "w") as f:
            f.write(css_sheet)

    nameRegex = r"public/icons/assets/sheets/spritesheet_(\d+x\d+).css"
    for file in glob.glob("public/icons/assets/sheets/spritesheet_*.css"):
        dimensionMatch = re.match(nameRegex,file)
        if dimensionMatch:
            dimension = dimensionMatch.groups()[0]
            print(f"Copying {dimension}")
            shutil.copy(f'sprites/spritesheet_{dimension}.png', f'public/icons/assets/sheets/spritesheet_{dimension}.png')
            shutil.copy(f'sprites/spritesheet_{dimension}.css', f'public/icons/assets/sheets/spritesheet_{dimension}.css')

    
