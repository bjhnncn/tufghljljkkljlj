from flask import Flask, render_template
from flask import Flask, render_template, request, redirect
from flask import Flask, render_template, request, redirect, url_for
from flask import Flask, Response, render_template
import cv2
import mediapipe as mp
import numpy as np
import time
from flask_cors import CORS



app = Flask(__name__)
CORS(app)

mp_pose = mp.solutions.pose
mp_drawing = mp.solutions.drawing_utils

# Constants for calorie calculation
CALORIES_PER_MINUTE = 0.01
body_weight_kg = 70
start_time = time.time()
total_calories_burned = 0
last_keypoints = None
in_motion = False
motion_start_time = 0

def calculate_intensity(current_keypoints, last_keypoints):
    if last_keypoints is None:
        return 0
    else:
        distance = np.linalg.norm(current_keypoints - last_keypoints)
        return distance

def calculate_calories_burned(motion_time):
    calories_burned = motion_time * CALORIES_PER_MINUTE * body_weight_kg / 60
    return calories_burned

def get_color_elapsed_time(elapsed_time):
    red = int(255 * min(elapsed_time / 60, 1))
    green = int(255 * (1 - min(elapsed_time / 60, 1)))
    blue = 0
    return (blue, green, red)

def generate_frames():
    global start_time, total_calories_burned, last_keypoints, in_motion, motion_start_time

    cap = cv2.VideoCapture(0)  # Use 0 for the default webcam

    with mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5) as pose:
        while True:
            ret, frame = cap.read()
            if not ret:
                break
            image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            image.flags.writeable = False
            result = pose.process(image)
            image.flags.writeable = True
            image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)

            try:
                landmarks = result.pose_landmarks.landmark
                current_keypoints = np.array([[landmark.x, landmark.y, landmark.z] for landmark in landmarks])
                intensity = calculate_intensity(current_keypoints, last_keypoints)

                if intensity > 0.1:
                    if not in_motion:
                        in_motion = True
                        motion_start_time = time.time()
                else:
                    if in_motion:
                        in_motion = False
                        motion_end_time = time.time()
                        motion_time = motion_end_time - motion_start_time
                        total_calories_burned += calculate_calories_burned(motion_time)

                last_keypoints = current_keypoints

                # Draw pose landmarks on the image
                mp_drawing.draw_landmarks(
                    image, result.pose_landmarks, mp_pose.POSE_CONNECTIONS)

                elapsed_time = time.time() - start_time
                time_str = f"{int(elapsed_time // 60):02d}:{int(elapsed_time % 60):02d}"
                color = get_color_elapsed_time(elapsed_time)

                # Add text overlay
                cv2.putText(image, f"Calories Burned: {total_calories_burned:.2f} kcal", (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 0.7, color, 2)
                cv2.putText(image, f"Elapsed Time: {time_str}", (10, 60), cv2.FONT_HERSHEY_SIMPLEX, 0.7, color, 2)

                # Encode the processed frame as JPEG
                _, buffer = cv2.imencode('.jpg', image)
                frame_bytes = buffer.tobytes()
                yield (b'--frame\r\n'
                       b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')
            except Exception as e:
                print(f"Error processing frame: {e}")
                pass

    cap.release()


@app.route('/')
def home():
    return render_template('login.html')


@app.route('/exercise')
def exercise():
    return render_template('Exercise.html')

@app.route('/exercise1')
def exercise1():
    return render_template('Exercise1.html')

@app.route('/exercise2')
def exercise2():
    return render_template('Exercise2.html')

@app.route('/index1')
def index1():
    return render_template('index1.html')
@app.route('/inde')
def index2():
    return render_template('index.html')
@app.route('/ind')
def index3():
    return render_template('login.html')
@app.route('/main')
def index4():
    return render_template('index1.html')


@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/reset', methods=['POST'])
def reset():
    global start_time, total_calories_burned, last_keypoints, in_motion, motion_start_time
    start_time = time.time()
    total_calories_burned = 0
    last_keypoints = None
    in_motion = False
    motion_start_time = 0
    return 'Reset successful'

@app.route('/virtual')
def virtual():
    return render_template('virtual.html')






if __name__ == '__main__':
    app.run(debug=True)
