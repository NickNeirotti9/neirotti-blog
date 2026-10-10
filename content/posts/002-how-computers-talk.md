---
id: 2
title: How Computers Talk
date: '2024-07-23T14:48:00Z'
subcategory: Technology
subject: Computers
youtube: cSy43lk-u_I
hook: Packets? Ports? Protocols?
featured: true
related:
  - 3
  - 4
  - 5
resources:
  - title: Networking Fundamentals Playlist
    url: >-
      https://youtube.com/playlist?list=PLIFyRwBY_4bRLmKfP1KnZA6rZbRHtxmXi&si=PdMswBjk4GzX0J21
    description: 15 great videos by Practical Networking
  - title: OSI Model Explained
    url: 'https://www.youtube.com/watch?v=vv4y_uOneC0&t=312s'
    description: ~17 minute video on OSI model by TechTerms
  - title: Intro to Networking Playlist
    url: >-
      https://youtube.com/playlist?list=PLJcaPjxegjBW3oTHL02TjEw0d6nvFK_cF&si=3wJWPekJ-r6dBRA8
    description: '13 detailed videos by Eli the Computer Guy, only watched a few of these...'
---

## Background

	A network allows computers to share resources and information. Without it, many of the conveniences and capabilities we take for granted today would not be possible.

### Key Milestones in Networking History

__1969: ARPANET__

- Advanced Research Projects Agency Network (ARPANET) was the first wide-area packet-switching network and the precursor to the modern internet. Instead of sending data as a single large chunk, packet-switching breaks data into smaller packets. Each packet is sent independently across the network and reassembled at the destination.

__1973: Ethernet__

- Ethernet enabled fast and reliable data transfer over local area networks (LANs), allowing computers to communicate efficiently while avoiding data collisions through a protocol that manages packet placement.

__1983: TCP/IP__

- Transmission Control Protocol/Internet Protocol (TCP/IP) became the standard protocol for ARPANET, providing universal rules for data transmission by introducing addressing and routing mechanisms.

__1991: World Wide Web__

- The World Wide Web made it easy for people to navigate and retrieve information online by using HTML for creating web pages and HTTP for linking and accessing these pages.

__1997: Wi-Fi__

- Wi-Fi, introduced in the 802.11 standard, allowed devices to connect to the internet wirelessly using radio waves.

__2000s: Broadband Internet__

- Broadband supported modern applications such as streaming and online gaming by significantly enhancing data transfer rates with wider frequency bands, advanced modulation techniques, and improved infrastructure.

__2010s: Cloud Computing and IoT__

- Cloud computing allowed storing and accessing data over the internet from remote servers and the Internet of Things (IoT) connected everyday devices to the internet.

## Data Transmission Fundamentals

	Binary is a way of representing information using only 0s and 1s. All data sent over the internet, like text, images, and videos, is converted into binary.

	A bit is a single binary digit (0 or 1). A byte consists of 8 bits and can represent 256 different values (00000000 - 11111111). Each character is assigned a unique byte value according to encoding standards like ASCII. Similarly, pixels in an image can be represented by bytes, where each byte (or group of bytes) corresponds to a color value.

- To put it in perspective, 1 paragraph is approximately equal to 1 kilobyte (1,024 characters).

## Network Architectures and Topologies

	Network architectures define how data is organized, transmitted, and managed within a network. Below are some key concepts.

**Client-Server Model:**

- A client is a device or program that requests resources. A server is a device or program that provides these resources. This setup is ideal for applications like web browsing and email, where clients (user devices) request web pages or emails from centralized servers.

**Peer-to-Peer Architecture:**

- Each device (peer) acts as both a client and a server, sharing resources directly with other peers. This model is commonly used in file-sharing networks where each device can upload and download files from other devices.

**OSI Model:**

- The Open Systems Interconnection model is a seven-layer conceptual framework that standardizes network communication to ensure interoperability among different systems and protocols. Understanding these layers will give you a solid understanding of how computers communicate.

**TCP/IP Model:**

- The Transmission Control Protocol/Internet Protocol model is a more simplified framework than OSI, consisting of four layers: Network Access, Internet, Transport, and Application. It is the foundation of the internet and dictates how data is packetized, addressed, transmitted, routed, and received.

**Network Topologies:**

__Star Topology:__

- Devices are connected to a central hub allowing easy addition or removal of devices. This is the most prevalent topology but if the hub fails, the entire network is affected.

__Bus Topology:__

- All devices share a single communication line or bus, which is simple and cost-effective but can become slow with high traffic.

__Ring Topology:__

- Devices are connected in a circle with data traveling in one direction. This reduces collisions but makes the network vulnerable if one device fails.

__Mesh Topology:__

- Every device is connected to every other device. High reliability but complex and expensive to implement.

## Physical Layer

	The physical layer is the first layer in the OSI model and is the physical connection between devices. It is responsible for the transmission of raw data (1s and 0s) over a physical medium or a wireless signal.

### Physical Mediums

**Copper Cables:**

	Data is transmitted as electrical pulses (voltages) through the copper conductor where each pulse represents a bit. A high voltage pulse is read as a 1 and low or no voltage is read as a 0.

- Cost-effective, easy to install, and widely used but have limited bandwidth and distance and are susceptible to electromagnetic interference (EMI).

Types:

- __Unshielded Twisted Pair (UTP):__ Commonly used in Ethernet networks. Consists of pairs of wires twisted together to reduce electromagnetic interference (EMI).

* __Shielded Twisted Pair (STP):__ Similar to UTP but includes additional shielding to further reduce EMI.

- __Coaxial Cables:__ Used for cable internet and older Ethernet networks. Consists of a central conductor, an insulating layer, a metallic shield, and an outer insulating layer.

**Fiber Optic Cables:**

	Data is transmitted as light pulses via a laser or LED. Light on is read as a 1, and light off is read as a 0. The light travels through the cable by the principle of total internal reflection, where the core of the fiber optic cable has a higher refractive index than the cladding, ensuring the light pulses remain within the core.

- High bandwidth, long distance, and immune to EMI but is more expensive and requires specialized equipment for installation and repair.

Types:

- __Single-mode Fiber:__ Transmits a single light wave through a narrow glass core, eliminating dispersion and allowing data to travel longer distances with higher bandwidth. Ideal for long-distance applications such as undersea cables and high-speed data centers where high capacity is critical, though it is harder to manufacture.

* __Multi-mode Fiber:__ Transmits multiple light waves or modes, which can cause modal dispersion and limit the distance the signal can travel. The wider core makes it easier to couple light into the fiber, and it is cheaper to manufacture (often made of plastic), but the multiple light paths can blur the signal over longer distances. Best for shorter distances where cost and ease of installation are prioritized.

__Multiplexing:__

Multiplexing is a concept that allows multiple data streams to be sent simultaneously over a single fiber optic cable.

- __Wavelength Division Multiplexing (WDM):__ Uses different wavelengths (colors) of light to carry multiple data streams on the same fiber. At the receiving end, a demultiplexer separates the combined signals back into individual wavelengths.

* __Time Division Multiplexing (TDM):__ Divides the transmission time into slots, with each slot carrying a different data stream. Data from each stream is transmitted in rapid succession, with each stream occupying a designated time slot. The receiving end synchronizes and reconstructs the original data streams.

---

### Wireless Networks

	Data is transmitted as electromagnetic waves (radio waves) through the air. These waves represent bits, where a signal's presence (high frequency) is read as a 1, and the absence or low frequency is read as a 0.

__Wireless Fidelity (Wi-Fi):__

- Wi-Fi is a technology that allows devices to connect to the internet and communicate with each other over a local area network (LAN).

* Wi-Fi uses radio waves in the 2.4 GHz and 5 GHz frequency bands to transmit data. The 5 GHz band provides faster speeds but has a shorter range compared to 2.4 GHz. These bands are divided into multiple channels to reduce interference from other devices.

- Wi-Fi networks are typically established using routers or access points (APs). Each network broadcasts a unique SSID (Service Set Identifier), which is the name that devices use to identify and connect to the network. When a Wi-Fi-enabled device (like a smartphone, laptop, or tablet) wants to connect, it sends a signal to the router or AP. The router processes this signal and transmits data between the device and the internet. Security protocols like WPA2 or WPA3 encrypt the data to protect it from unauthorized access.

__Bluetooth:__

- Bluetooth is a short-range wireless technology designed for device-to-device communication.

* Bluetooth uses radio waves in the 2.4 GHz frequency band to connect devices over short distances. To communicate, Bluetooth devices must first be paired. Pairing involves making one device discoverable and then selecting it from another device to establish a secure connection. This process uses a unique identifier called a MAC address which will be explored in more detail later.

- Bluetooth employs a technique called frequency-hopping spread spectrum (FHSS), which rapidly switches the carrier frequency 1,600 times per second across 79 channels (each 1 MHz wide) in the 2.4 GHz band. This reduces interference and enhances security since eavesdroppers would need to follow the exact frequency-hopping pattern to intercept the signal.

---

### Cellular Networks:

	Cellular networks use a network of cell towers that cover hexagonal geographic areas known as cells. Each cell tower provides coverage to a specific area, and the network of these towers allows for continuous coverage across large regions. Devices do not simply connect to the nearest tower; they use processes of cell selection and handoff, ensuring the device is always connected to the best possible tower.

- When a device is turned on or moves into a new area, it scans for available cell towers and selects the one with the best combination of signal strength and quality metrics. Devices continuously monitor the signal strength (RSSI - Received Signal Strength Indicator) of nearby cell towers. They typically connect to the tower with the strongest signal, which usually corresponds to the nearest tower. Besides signal strength, devices also consider other quality metrics such as Signal-to-Noise Ratio (SNR) and Bit Error Rate (BER) to determine the best connection.

__Mobile Switching Centers (MSCs):__

- MSCs are crucial for managing communications within a cell network, including call setup, routing, and termination. MSCs act as central hubs that connect cell towers and coordinate the transfer of calls and data sessions as devices move from one cell to another. When a call is initiated, the MSC sets up the connection between the calling and receiving parties, ensuring that the call is routed through the appropriate cell towers and networks.

__Handoffs:__

	As a device moves, it may need to switch from one cell tower to another to maintain a strong and reliable connection. This process, known as handoff, is managed by the MSC to ensure seamless communication. The MSC decides when a handoff is necessary based on signal quality and coordinates the transition between cell towers.

- __Hard Handoff:__ The device disconnects from the current cell tower before connecting to the new one. This is common in older 2G and 3G networks.

* __Soft Handoff:__ The device simultaneously connects to multiple towers during the transition for a smoother handoff. This is more common in modern 4G and 5G networks.

	To optimize network performance, devices may also be directed to connect to different towers or frequencies based on network load, even if another tower has a slightly stronger signal. This helps distribute traffic evenly across the towers. These towers are connected with fiber optic cables, enabling real-time phone calls and much more.

__Advancements in Cellular Networks:__

3G:

- 3G uses technologies like Wideband Code Division Multiple Access (WCDMA) and High-Speed Packet Access (HSPA).

* WCDMA allows multiple users to share the same frequency band by assigning unique codes to each user's data. These codes enable the system to differentiate between different users, even if their data overlaps in time and frequency. This is known as spread-spectrum technology.

- HSPA improves the efficiency of data transmission through techniques like higher-order modulation (16QAM), which combines both amplitude and phase modulation. The different states of amplitude and phase create a constellation diagram with 16 points, each corresponding to a specific 4-bit binary value. The distance between points determines how susceptible the modulation is to noise and interference. Closer points (higher-order QAM) require better signal quality.

4G:

- 4G LTE uses technologies like Orthogonal Frequency Division Multiple Access (OFDMA) and Multiple Input Multiple Output (MIMO).

* OFDMA allows multiple users to share the same channel by dividing it into smaller sub-channels.

- MIMO enhances data transmission by using multiple antennas at both the transmitter and receiver. By transmitting different data streams simultaneously on multiple antennas, MIMO increases the capacity and throughput of the network like adding more lanes to a highway. Advanced signal processing techniques are used to manage these multiple data streams, taking advantage of spatial diversity.

5G:

- 5G leverages advanced technologies such as millimeter wave (mmWave), Massive MIMO, and Beamforming.

* Millimeter wave technology uses higher frequency bands above 24 GHz, which provide significantly larger bandwidth compared to lower frequency bands. This enables ultra-high-speed data transmission, although the higher frequencies have shorter range and are more easily obstructed by obstacles.

- Massive MIMO takes the MIMO concept further by using a much larger number of antennas at the base station. This greatly increases the capacity and efficiency of the network by serving multiple users simultaneously with high data rates. Each antenna can create a narrow beam of signal directed towards a specific user, which reduces interference and enhances signal quality.

* Beamforming is another key technology in 5G that directs signals to specific users rather than broadcasting them in all directions. By focusing the signal, beamforming increases the efficiency and reliability of data transmission. This technique is particularly effective in dense urban environments where there are many users and potential sources of interference.

## Data Link Layer

	The Data Link Layer is the second layer in the OSI model. It’s responsible for establishing and maintaining a reliable connection between devices on the same network. It facilitates error detection and correction and controls access to the physical medium with the help of Network Interface Cards (NICs) and Switches. The goal of this layer is hop-to-hop delivery, which means ensuring data is reliably transferred from one device to the next within the same network segment.

**Network Interface Cards (NICs):**

A NIC is a hardware component that connects a device to the physical layer and is essential for both wired and wireless network connections.

- __Ethernet NICs:__ Used for wired connections and typically have an RJ45 port for connecting to Ethernet cables.

* __Wi-Fi Access Cards:__ Also known as wireless NICs, allow devices to connect to Wi-Fi networks using radio waves.

	NICs receive data from the computer and encapsulate it into frames. A frame is a structured packet of data that includes the destination and source MAC addresses, the data payload, and error-checking information. MAC addresses are unique 48-bit identifiers assigned to each NIC represented in hexadecimal format (e.g., 00:1A:2B:3C:4D:5E).

**Switches:**

	A switch is a network device that operates at the Data Link Layer to connect devices within a network. Switches have three main operations: learning, flooding, and forwarding.

- __Learning:__ Switches maintain a MAC address table. When a frame is received, the switch reads the source MAC address and updates the table with the corresponding port number. The switch now knows to send all information addressed to said MAC address through said port.

* __Flooding:__ If the destination MAC address is not in the MAC address table, the switch broadcasts the frame to all ports except the one it was received on.

- __Forwarding:__ If the destination MAC address is found in the table, the switch forwards the frame to the specific port associated with that address.

**Error Detection and Correction:**

	Error detection and correction are crucial functions of the Data Link Layer. They are typically performed using techniques such as checksums and Cyclic Redundancy Check (CRC).

- __Checksums:__ A straightforward method for verifying data integrity by summing up the numerical values of data blocks and appending the result. During transmission or storage, the checksum is recalculated and compared to detect errors.

* __CRC:__ Works by appending a CRC code to the data, which is generated using a polynomial division process. Upon reception, the data is checked for errors using the same polynomial. When an error is detected, the typical method of correction involves retransmission. The receiver discards the corrupted frame and requests the sender to resend the data.

## Network Layer

	The Network Layer is the third layer in the OSI model. It’s responsible for the addressing and routing of data packets across different networks ensuring end-to-end delivery. A network is a logical grouping of devices (hosts) connected to one another to allow the sharing of data and resources. Networks can be as small as a handful of devices within a single room or as large as millions of devices spread across the entire globe. The two main types are:

__Local Area Network (LAN):__

- Covers a small geographic area, such as a single building, office, or campus. LANs are designed to connect computers and other devices within a limited area to share resources like files and internet connections. Examples include home and office networks.

__Wide Area Network (WAN):__

- Spans a large geographic area, such as a city, country, or even continents. WANs are used to connect multiple LANs that are geographically dispersed. The internet is the largest example of a WAN. Corporate networks that connect offices in different cities or countries are also WANs.

**IP (Internet Protocol) Addresses:**

- IP addresses are the identity of each device, stamped on everything it sends or receives. IPv4 consists of 32-bit addresses in decimal format (e.g., 192.168.1.1) but is becoming less common due to the growing number of devices. IPv6 consists of 128-bit addresses, expressed in hexadecimal format (e.g., 2001:0db8:85a3:0000:0000:8a2e:0370:7334), providing a much larger address space.

**Routers:**

	A router is a network device that forwards data BETWEEN networks in the form of packets. A packet is a small unit of data that includes the payload (the actual data being transmitted) and headers containing control information such as the source and destination IP addresses and MAC addresses.

__How Routers Manage Data Traffic:__

- Routers maintain routing tables that contain information about the paths to various network destinations. Each entry in a routing table includes a destination IP address, a subnet mask, and the next hop. When a packet arrives, the router examines its destination IP address, looks it up in the routing table, and forwards the packet to the next appropriate hop.

* Routers use algorithms to determine the best path for data to travel. Common routing algorithms include RIP (Routing Information Protocol), OSPF (Open Shortest Path First), and BGP (Border Gateway Protocol). Factors considered in path determination include the number of hops, link speed, traffic load, and reliability. Once the best path is determined, the router forwards the packet to the next router or the destination device.

**ARP (Address Resolution Protocol):**

	ARP is used to map a known IP address to a MAC address on a local network segment. This is essential because while IP addresses are used for routing across networks, MAC addresses are required for data link layer communications on the same network segment.

- When a device needs to communicate with another device on the same local network but only knows its IP address, it broadcasts an ARP request asking, "Who has this IP address? Tell me your MAC address." The device with the matching IP address responds with an ARP reply, providing its MAC address.

* To reduce the frequency of ARP requests and replies, devices maintain an ARP cache—a table that stores the mappings of IP addresses to MAC addresses. When an ARP reply is received, the IP-to-MAC mapping is stored in the ARP cache. Entries in the ARP cache have a timeout value and are periodically refreshed to ensure they remain accurate.

**Network Hierarchy:**

	Routers are organized in a hierarchical structure using subnets. Subnetting is the practice of dividing a larger network into smaller, more manageable segments, which helps improve network performance, management, and security.

	A subnet mask is a 32-bit number used to divide an IP address into the network and host portions. It helps routers determine which part of the IP address identifies the network and which part identifies the specific device (host) within that network.

	A subnet mask is written in decimal format, such as 255.255.255.0, which indicates that the first three octets of an IP (192.168.1) represent the network portion, while the last octet (0) represents the specific device within that network. Classless Inter-Domain Routing (CIDR) notation provides a more flexible way to represent subnet masks. It uses a slash (/) followed by the number of bits used for the network portion. For example, the IP address 192.168.1.0/24 means that the first 24 bits are used for the network portion, which corresponds to the traditional subnet mask of 255.255.255.0.

	Each subnet has a unique network address derived from the main network address by extending the subnet mask. For example, a corporation with the base IP address 192.x.x.x can create subnets for different departments:

- D.C. Office: 192.168.x.x

* Engineering Team in D.C.: 192.168.10.x

- Specific Host in Engineering Team Subnet: 192.168.10.20

	This hierarchical structure allows for efficient management and organization of IP addresses within a large network.

	Subnetting allows for route summarization, which reduces routing table size and complexity. For instance, the routing table can summarize that all traffic to the corporation should be sent to the main network address 192.0.0.0/8. It also improves scalability, as adding a new subnet, such as 192.168.30.x for the sales team, is straightforward and does not require significant changes to the existing network structure. Consistent connectivity is another benefit, as all subnets require the same number of routers to be crossed to access all networks.

## Transport Layer

	The Transport Layer is the fourth layer in the OSI model. It’s responsible for distinguishing data streams and delivering them to the correct applications, ensuring that data is transferred reliably and in the correct sequence.

	This layer breaks down large data streams into smaller, manageable segments for transmission and reassembles them at the destination using the assigned sequence numbers. This process ensures that data can be efficiently sent over the network and correctly reassembled, even if it arrives out of order.

**TCP and UDP:**

TCP and UDP are the primary protocols used in the Transport Layer, each serving different needs.

__TCP (Transmission Control Protocol):__

- TCP establishes a connection between sender and receiver before data transfer begins and ensures data is delivered in order and without errors through acknowledgments and retransmissions. It also controls the flow of data, adjusting based on network congestion to avoid packet loss. While slower than UDP, TCP is far more reliable and is used in applications such as email, web browsing, and file transfer.

__UDP (User Datagram Protocol):__

- UDP is connectionless and does not control flow or guarantee delivery, order, or error correction. That said, it is lightweight, making it faster than TCP and useful in real-time applications such as live streaming, phone calls, and online games.

**Ports:**

	Ports are numerical identifiers in the transport layer that help differentiate multiple communication streams between the same two devices. They allow multiple applications to use the network simultaneously without interference.

	Ports are 16-bit numbers, allowing for 65,536 possible values, ranging from 0 to 65535. These are divided into three categories: well-known ports, registered ports, and dynamic (private or ephemeral) ports.

__Well-known ports (0-1023):__

- Reserved for common services and protocols (FTP, HTTP, etc.)

__Registered ports (1024-49151):__

- Used by vendors for proprietary applications such as Microsoft SQL Server on port 1433.

__Dynamic or private ports (49152-65535):__

- Assigned dynamically by the operating system for short-lived communications. For example, when you visit a website, your web browser uses a dynamic port (e.g., 49160) to send a request to the web server's well-known port 80 (HTTP) or 443 (HTTPS).

## Session Layer

	The Session Layer is the fifth layer in the OSI model. It’s responsible for setting up, managing, and terminating sessions between two communicating devices.

	__Checkpoints__ are often used to help in resuming communication from a known state in case of a failure, making the session more reliable. For example, if a large file transfer is interrupted, it can resume from the last checkpoint rather than restarting.

	This layer often handles __authentication__ processes to verify the identity of the communicating parties before a session is established. This can include username/password combinations, tokens, and multi-factor authentication (MFA). Once authenticated, the layer manages __authorization__ to ensure that the communicating parties have the appropriate permissions to access certain data or perform specific actions within the session.

	In web communications, the Session Layer can utilize __cookies__ to maintain session state and identify users independent of the lower layers (2-4). This allows the website to __remember the user's session__, such as login status or user preferences, __despite changes in network connections__.

	The Session Layer also plays a significant role in managing API communications. It ensures that API requests and responses are properly synchronized, authenticated, and authorized, providing a reliable and secure connection between different software components.

## Presentation Layer

	The Presentation Layer is the sixth layer in the OSI model. This layer is crucial for ensuring that data is properly formatted, encrypted, and compressed, enabling seamless and secure communication between systems.

	Different systems may use different encoding schemes such as ASCII, Unicode, UTF-8, and EBCDIC. This layer ensures the correct encoding is used so that data is interpreted correctly, allowing data from the sending system to be understood by the receiving system, even if they use different data formats.

	The Presentation Layer provides security by encrypting data before it is transmitted and decrypting it upon arrival. Commonly, SSL/TLS (Secure Sockets Layer/Transport Layer Security) protocols encrypt data to secure online transactions and communications.

	This layer also compresses data to reduce the amount that needs to be transmitted, improving speed and efficiency. Compression reduces the size of data by eliminating redundancies or using algorithms that represent data more efficiently. For example, in a text file, repeated words or patterns can be replaced with shorter symbols. Decompression uses the reverse process to reconstruct the original data from its compressed form. This is particularly useful for transmitting large files, images, and multimedia content.

__Lossy Compression:__

- Reduces file size by permanently eliminating certain information, especially redundant information. This is typical in multimedia files like JPEG images and MP3 audio, where a slight loss of quality is acceptable.

__Lossless Compression:__

- Reduces file size without any loss of data, ensuring that the original data can be perfectly reconstructed. This is used for text files, executable files, and sometimes images, such as PNG files.

## Application Layer

	The Application Layer is the seventh and top layer in the OSI model. It serves as the interface between the user and the network, facilitating various services such as email, file transfer, and web browsing. This layer offers a platform for applications to present data in a readable format, using many protocols to support these services, ensuring different systems and applications can work together smoothly.

**Common Protocols:**

__HTTP/HTTPS (HyperText Transfer Protocol/Secure):__

- Used for transferring web pages and resources over the internet. HTTPS adds a layer of security by encrypting the data.
- Commands: GET, POST, PUT, DELETE, HEAD

__FTP/SFTP (File Transfer Protocol/Secure File Transfer Protocol):__

- Facilitates file transfer between a client and a server. SFTP provides security over an encrypted SSH connection.
- Commands: GET, PUT, STOR, RETR, LIST, MKDIR, RMDIR

__DNS (Domain Name System):__

- Translates human-readable domain names (e.g., www.example.com) into IP addresses that computers can understand.
- Commands: A (Address record), AAAA (IPv6 address record), CNAME (Canonical name record), MX (Mail exchange record), NS (Name server record)

__SMTP (Simple Mail Transfer Protocol):__

- Used for sending emails from a client to a server or between servers.
- Commands: HELO, EHLO, MAIL FROM, RCPT TO, DATA, QUIT, AUTH

__IMAP/POP3 (Internet Message Access Protocol/Post Office Protocol 3):__

- Used for retrieving emails from a server. IMAP allows for managing and synchronizing emails across multiple devices, while POP3 downloads emails to a single device.
- IMAP Commands: SELECT, FETCH, STORE, SEARCH, DELETE, EXAMINE
- POP3 Commands: USER, PASS, LIST, RETR, DELE, QUIT

__Telnet/SSH (Secure Shell):__

- Provides remote command-line access to servers. SSH adds security by encrypting the connection.
- Telnet Commands: open, close, mode, display, send
- SSH Commands: ssh, scp (secure copy), sftp (SSH File Transfer Protocol)

	The TCP/IP model consolidates the last three layers of the OSI model into a single Application Layer to simplify network architecture. This reflects how these layers are often combined in real-world scenarios, where applications handle data formatting, encryption, and session management together in different ways depending on the protocol. It’s important to understand that these models are just conceptual frameworks. Rather than constraining your networking knowledge to fit perfectly within these models, use the OSI model to understand layers of abstraction and how different aspects of networking interact.

## OSI Model in Action (TLDR)

	To understand how the OSI model works in a real-world scenario, let's consider an example where a user accesses a website using a browser. We’ll follow the process from the Application Layer (Layer 7) down to the Physical Layer (Layer 1), and then back up to the Application Layer on the receiving end.

**Application Layer (Layer 7):**

- A user types [https://existnchill.com/](https://existnchill.com/) into their web browser and presses Enter.

* The browser generates an HTTPS GET request to fetch the web page.

**Presentation Layer (Layer 6):**

- The HTTP request is translated into a format suitable for transmission and is encrypted using SSL/TLS.

**Session Layer (Layer 5):**

- The browser establishes a session with the web server which involves setting up, managing, and terminating the connection as needed.

**Transport Layer (Layer 4):**

- The HTTP request is segmented into smaller packets for transmission.

* TCP is used to ensure reliable delivery of the packets and the request is directed to port 443 for HTTPS.

**Network Layer (Layer 3):**

- The packets are assigned source and destination IP addresses and the best path for the packets to travel is determined.

**Data Link Layer (Layer 2):**

- The packets are framed with the appropriate MAC addresses for the source and destination and CRC (Cyclic Redundancy Check) is added to detect any errors during transmission.

**Physical Layer (Layer 1):**

- The frames are converted into electrical, optical, or radio signals and transmitted over the physical medium (e.g., Fiber optic cable, Wi-Fi).

__At the Receiving End:__

**Data Link Layer (Layer 2):**

- The frames are checked for errors using CRC. If no errors are detected, the MAC addresses are read, and the frames are passed to the Network Layer.

**Network Layer (Layer 3):**

- The IP addresses are examined, and the packets are forwarded to the appropriate Transport Layer protocol.

**Transport Layer (Layer 4):**

- The packets are reassembled into the original HTTPS request and TCP ensures that all packets have been received.

**Session Layer (Layer 5):**

- The session between the client and server is maintained, allowing for continuous data exchange.

**Presentation Layer (Layer 6):**

- The data is decrypted and translated back into a format that can be understood by the Application Layer.

**Application Layer (Layer 7):**

- The web server processes the HTTP GET request, retrieves the requested web page, and sends the response back through the layers in reverse order.
