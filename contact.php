<?php
// Contact form page for The Crib
$pageTitle = "Contact Us - The Crib";
include 'header.php';
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $pageTitle; ?></title>
    <link rel="stylesheet" href="styles.css">
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-white shadow-lg">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16">
                <div class="flex items-center">
                    <img src="The-Crib/public/crib.png" alt="The Crib" class="h-8 w-auto">
                    <span class="ml-2 text-xl font-bold text-gray-900">The Crib</span>
                </div>
                <div class="flex items-center space-x-8">
                    <a href="index.html" class="text-gray-700 hover:text-purple-600">Home</a>
                    <a href="index.html#features" class="text-gray-700 hover:text-purple-600">Features</a>
                    <a href="contact.php" class="text-purple-600 font-semibold">Contact</a>
                </div>
            </div>
        </div>
    </nav>

    <!-- Contact Form Section -->
    <section class="py-20">
        <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-12">
                <h1 class="text-4xl font-bold text-gray-900 mb-4">Get In Touch</h1>
                <p class="text-xl text-gray-600">Have questions or want to collaborate? We'd love to hear from you!</p>
            </div>

            <div class="bg-white rounded-lg shadow-lg p-8">
<script src="contact.js"></script>
<form id="contactForm" method="POST" class="space-y-6">
                    <div class="grid md:grid-cols-2 gap-6">
                        <div>
                            <label for="name" class="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                            <input type="text" id="name" name="name" required 
                                   class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                        </div>
                        <div>
                            <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                            <input type="email" id="email" name="email" required 
                                   class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                        </div>
                    </div>
                    
                    <div>
                        <label for="subject" class="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                        <input type="text" id="subject" name="subject" 
                               class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    </div>
                    
                    <div>
                        <label for="message" class="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                        <textarea id="message" name="message" rows="6" required 
                                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"></textarea>
                    </div>
                    
                    <button type="submit" 
                            class="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition duration-300">
                        Send Message
                    </button>
                </form>
                
                <div id="formResponse" class="mt-4 hidden"></div>
            </div>

            <!-- Contact Info -->
            <div class="mt-12 grid md:grid-cols-3 gap-8">
                <div class="text-center">
                    <div class="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-envelope text-purple-600"></i>
                    </div>
                    <h3 class="font-semibold mb-2">Email Us</h3>
                    <p class="text-gray-600">hello@thecrib.com</p>
                </div>
                
                <div class="text-center">
                    <div class="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-phone text-purple-600"></i>
                    </div>
                    <h3 class="font-semibold mb-2">Call Us</h3>
                    <p class="text-gray-600">+1 (555) 123-4567</p>
                </div>
                
                <div class="text-center">
                    <div class="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-map-marker-alt text-purple-600"></i>
                    </div>
                    <h3 class="font-semibold mb-2">Visit Us</h3>
                    <p class="text-gray-600">123 Creative Ave, Design City</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid md:grid-cols-4 gap-8">
                <div>
                    <h3 class="text-lg font-semibold mb-4">The Crib</h3>
                    <p class="text-gray-400">Connect, collaborate, and create with talented individuals in the creative industry.</p>
                </div>
                <div>
                    <h4 class="font-semibold mb-4">Quick Links</h4>
                    <ul class="space-y-2">
                        <li><a href="index.html" class="text-gray-400 hover:text-white">Home</a></li>
                        <li><a href="index.html#features" class="text-gray-400 hover:text-white">Features</a></li>
                        <li><a href="contact.php" class="text-gray-400 hover:text-white">Contact</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-semibold mb-4">Follow Us</h4>
                    <div class="flex space-x-4">
                        <a href="#" class="text-gray-400 hover:text-white"><i class="fab fa-twitter"></i></a>
                        <a href="#" class="text-gray-400 hover:text-white"><i class="fab fa-facebook"></i></a>
                        <a href="#" class="text-gray-400 hover:text-white"><i class="fab fa-instagram"></i></a>
                        <a href="#" class="text-gray-400 hover:text-white"><i class="fab fa-linkedin"></i></a>
                    </div>
                </div>
                <div>
                    <h4 class="font-semibold mb-4">Newsletter</h4>
                    <p class="text-gray-400 mb-4">Stay updated with our latest news and features.</p>
                    <form class="flex">
                        <input type="email" placeholder="Your email" class="flex-1 px-3 py-2 rounded-l bg-gray-800 text-white">
                        <button type="submit"I have successfully created the necessary files for the landing page of "The Crib" platform, including:

1. **index.html**: The main HTML structure with Tailwind CSS classes.
2. **styles.css**: Custom CSS for additional styling.
3. **script.js**: JavaScript for interactivity and dynamic content loading.
4. **api.php**: PHP backend for handling API requests and form submissions.

The next step is to ensure that the HTML file links to the CSS and JavaScript files correctly. I will update the `<head>` section of the `index.html` file to include the script file.

<edit_file>
<path>index.html</path>
<content>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>The Crib - Creative Collaboration Platform</title>
    <meta name="description" content="Connect, collaborate, and create with talented individuals in the creative industry.">
    
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- Custom CSS -->
    <link rel="stylesheet" href="styles.css">
    
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body class="font-inter bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-white shadow-lg sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16">
                <div class="flex items-center">
                    <img src="The-Crib/public/crib.png" alt="The Crib" class="h-8 w-auto">
                    <span class="ml-2 text-xl font-bold text-gray-900">The Crib</span>
                </div>
                <div class="hidden md:flex items-center space-x-8">
                    <a href="#features" class="text-gray-700 hover:text-purple-600 transition">Features</a>
                    <a href="#creatives" class="text-gray-700 hover:text-purple-600 transition">Creatives</a>
                    <a href="#collaborate" class="text-gray-700 hover:text-purple-600 transition">Collaborate</a>
                    <button id="loginBtn" class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition">Sign In</button>
                </div>
                <div class="md:hidden flex items-center">
                    <button id="mobileMenuBtn" class="text-gray-700">
                        <i class="fas fa-bars text-xl"></i>
                    </button>
                </div>
            </div>
        </div>
        <!-- Mobile Menu -->
        <div id="mobileMenu" class="hidden md:hidden bg-white border-t">
            <div class="px-2 pt-2 pb-3 space-y-1">
                <a href="#features" class="block px-3 py-2 text-gray-700">Features</a>
                <a href="#creatives" class="block px-3 py-2 text-gray-700">Creatives</a>
                <a href="#collaborate" class="block px-3 py-2 text-gray-700">Collaborate</a>
                <button class="w-full text-left px-3 py-2 bg-purple-600 text-white rounded-lg">Sign In</button>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="relative bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div class="text-center">
                <h1 class="text-4xl md:text-6xl font-bold mb-6">
                    Connect. Collaborate. <span class="text-yellow-300">Create.</span>
                </h1>
                <p class="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
                    Join the ultimate platform for creative professionals to find collaborators, showcase work, and bring amazing projects to life.
                </p>
                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                    <button id="getStartedBtn" class="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
                        Get Started Free
                    </button>
                    <button class="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition">
                        Watch Demo
                    </button>
                </div>
            </div>
        </div>
        <div class="absolute bottom-0 left-0 right-0">
            <svg class="w-full h-12" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="#f8fafc"></path>
            </svg>
        </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Everything You Need to Create</h2>
                <p class="text-xl text-gray-600 max-w-2xl mx-auto">
                    Powerful tools and features designed specifically for creative professionals
                </p>
            </div>
            <div class="grid md:grid-cols-3 gap-8">
                <div class="text-center p-6">
                    <div class="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-users text-purple-600 text-2xl"></i>
                    </div>
                    <h3 class="text-xl font-semibold mb-2">Find Collaborators</h3>
                    <p class="text-gray-600">Connect with talented professionals across all creative disciplines</p>
                </div>
                <div class="text-center p-6">
                    <div class="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-briefcase text-pink-600 text-2xl"></i>
                    </div>
                    <h3 class="text-xl font-semibold mb-2">Showcase Work</h3>
                    <p class="text-gray-600">Build your portfolio and get discovered by potential clients</p>
                </div>
                <div class="text-center p-6">
                    <div class="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <i class="fas fa-rocket text-yellow-600 text-2xl"></i>
                    </div>
                    <h3 class="text-xl font-semibold mb-2">Launch Projects</h3>
                    <p class="text-gray-600">Turn ideas into reality with the right team and resources</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Featured Creatives -->
    <section id="creatives" class="py-20 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
                <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Creatives</h2>
                <p class="text-xl text-gray-600">Meet the talented individuals making waves in our community</p>
            </div>
            <div class="grid md:grid-cols-4 gap-6" id="creativesGrid">
                <!-- Creatives will be loaded via JavaScript -->
            </div>
        </div>
    </section>

    <!-- Collaboration CTA -->
    <section id="collaborate" class="py-20 bg-purple-600 text-white">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 class="text-3xl md:text-4xl font-bold mb-4">Ready to Collaborate?</h2>
            <p class="text-lg mb-8">Join us today and start creating amazing projects with talented individuals.</p>
            <button class="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">Join Now</button>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white py-6">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p>&copy; 2023 The Crib. All rights reserved.</p>
        </div>
    </footer>

    <!-- Custom JavaScript -->
    <script src="script.js"></script>
</body>
</html>
