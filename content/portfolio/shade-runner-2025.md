---
slug: shade-runner-2025
title: Shade Runner 2025
youtube: tiBkrZWUvCc
dateFrom: '2025-03-03'
dateTo: '2025-03-05'
description: >-
  The goal of this project was to improve sleep health by way of timed light
  exposure. The system opens and closes blinds dynamically using a Raspberry Pi,
  ESP32, and a motorized pulley mechanism.
---

## Abstract

	The Shade Runner is a low-cost, ceiling-mounted automated curtain system designed to improve sleep and wakefulness through intentional light exposure. Using an ESP32 connected to a motor and pulley system, the device opens or closes the users’ shades based on defined times or real-time sunrise and sunset data pulled from an online API. A Raspberry Pi runs a Flask web app that allows users to select and control their preferred mode. This natural sunlight exposure effectively anchors your circadian rhythm, decreasing grogginess in the morning and boosting energy throughout the day.

## Introduction

	In city environments, artificial lights such as streetlamps often force people to close their blinds to maintain optimal sleep conditions. However, this prevents them from experiencing natural sunrise cues, which are vital for regulating the body’s circadian rhythm. Studies show that early light exposure — even through closed eyelids — can help increase total sleep time and cause individuals to feel tired earlier, supporting better longevity and vitality. Inspired by this research and a personal desire to improve my own sleep hygiene, this project aims to automate the opening and closing of window blinds based on either fixed times or real-time solar data.

	The system consists of an ESP32 microcontroller, a motor driver, and a 6V motor enclosed in a 3D-printed mount secured to the ceiling. A pulley system drives the blinds using string tensioned around a return wheel. The ESP32 receives commands over WiFi from a Raspberry Pi, which hosts a web interface built with Flask. Users can either manually set times or automate control based on their local sunrise and sunset, with optional time offsets to suit various lifestyles. This system demonstrates a simple and scalable approach to integrating IoT into home automation to promote better sleep and wake cycles.

## Background & Literature Review

	Shade Runner was designed to improve sleep quality by automating light exposure in the sleep environment. Biology research has consistently shown that light is a critical cue for aligning the body’s internal clock. Specifically, morning light helps synchronize circadian rhythms, while evening light suppresses melatonin production which can cause sleep disturbances and misalignment of the natural sleep-wake cycle [1].

	Recent studies confirm that even through closed eyelids, light can activate the cells in your eyes responsible for advancing the circadian clock, making it possible to influence sleep physiology without the user being fully awake [2]. This presents a unique opportunity: using a system like the proposed to block light at night while introducing real light in the morning which is something commercial artificial sunrise lamps try to simulate.

	Additionally, research from the NIH describes Delayed Sleep–Wake Phase Disorder (DSWPD) as a condition increasingly affecting young adults, especially due to screen exposure and inconsistent sleep patterns. DSWPD is linked to fatigue, poor concentration, and increased risk of depression [3]. Light exposure, particularly in the early morning, has been shown to shift the circadian phase earlier, improving sleep quality and reducing symptoms in individuals with DSWPD [4]. These findings underscore the value of a system that dynamically controls light exposure. While other solutions exist, not many address both nighttime light blocking and real sunlight exposure upon waking. Shade Runner fills this gap by using real sunlight to deliver an optimized sleep environment.

## Methods and Implementation



### System Overview

	The user selects either manual wake/bed times or an automatic sunrise/sunset mode with time offset. These preferences are set through a local Flask web app hosted on a Raspberry Pi. Once submitted, the Pi communicates wirelessly with an ESP32 microcontroller mounted on the ceiling near the blinds, triggering a DC motor to rotate in the appropriate direction via a motor driver.

### Hardware Components

- ESP32 S3 WROOM-1: Handles Wi-Fi communication and controls the motor based on received times. Powered by 4xAA batteries (1.2V each, rechargeable).
- DRV8833 Motor Driver: Drives the 6V DC motor in both directions. Connected to the ESP32 and powered by a separate 9V battery.
- 6V DC Geared Motor: Rotates a 3D-printed pulley to move the curtain string.
- Raspberry Pi 4B: Hosts the Flask application and handles scheduling logic and API requests.
- Custom 3D-Printed Enclosures and Pulleys: One box contains the motor, driver, ESP, and batteries. A second printed guide pulley adds tension to ensure consistent belt tracking.
- String + Rubber Band Pulley Groove: Used as a low-cost, effective drive system to convert rotary motion into linear curtain movement.

### Software & Communication

Flask Web App (Python): Provides a local interface accessible on any device connected to the same network. Users can choose between two modes:

- Manual: Directly enter wake and bed times.
- Sunrise/Sunset: Uses sunrise-sunset.org API to fetch solar times based on location, with an optional offset in minutes.

ESP32 Firmware (via Arduino IDE): Receives and parses the POST request from the Pi, saves sunrise and sunset times, and continuously checks system time (via NTP) to trigger the motor when necessary.

Communication Protocol: Simple HTTP POST request from Flask app to ESP32 over Wi-Fi using JSON payload.

You can find this code on my [GitHub Repo](https://github.com/NickNeirotti9/InternetOfThings/tree/main/ShadeRunner)

## Conclusions & Future Improvements

	This project proved the design and implementation of an automated blind control system that aligns natural light exposure with the user's circadian rhythm. This project raises a few questions for future research. Can light sensors be integrated to allow real-time adjustment based on actual light intensity rather than time alone? And, how effective actually is this system in improving sleep quality over time?

	While I’d consider this project a success there is lots of room for improvement. For starters, I’d implement stall detection and limit switches to ensure that the amount the blinds move is consistent. Second, I’d power the entire system with a centralized battery with the ability to charge with solar power. I’d also improve the mechanical design and implement the software with smart home systems like Alexa to include voice activation.

## Resources & References

[[1] A. Huberman, “Master Your Sleep & Be More Alert When Awake,” Huberman Lab Podcast, Jan. 11, 2021.](https://www.youtube.com/watch?v=nm1TxQj9IsQ)\
[[2] Centers for Disease Control and Prevention (CDC), “Effects of Light on Sleep and Alertness,” NIOSH.](https://www.cdc.gov/niosh/work-hour-training-for-nurses/longhours/mod2/19.html)\
[[3] Futenma, K., et al., “Delayed sleep-wake phase disorder and its related sleep behaviors in the young generation,” Frontiers in Psychiatry, 2023.](https://pmc.ncbi.nlm.nih.gov/articles/PMC10235460/)\
[[4] Blume, C., et al., “Effects of light on human circadian rhythms, sleep and mood,” Somnology, vol. 23, no. 3, pp. 147–156, 2019.](https://pmc.ncbi.nlm.nih.gov/articles/PMC6751071/)
