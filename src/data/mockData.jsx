export const properties = [
  // --- ORIGINAL 3 ---
  {
    id: 1,
    title: "Modern Glass Villa Runda",
    price: "KES 85,000,000",
    location: "Runda, Nairobi",
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1920&auto=format&fit=crop",
    description:
      "Experience the pinnacle of luxury living in this architectural masterpiece located in the heart of Runda. Featuring floor-to-ceiling glass walls, a heated infinity pool, and a state-of-the-art smart home system.",
    specs: { beds: 5, baths: 6, sqft: 4500, lot: "0.5 Acres", type: "Villa" },
    beds: 5,
    baths: 6,
    sqft: 4500,
    amenities: [
      "Swimming Pool",
      "Backup Generator",
      "Gym",
      "24/7 Security",
      "Smart Home",
      "DSQ",
      "Garden",
      "High Speed Internet",
    ],
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1920&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1920&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1920&auto=format&fit=crop",
    ],
    status: "For Sale",
  },
  {
    id: 2,
    title: "Skyline Penthouse Westlands",
    price: "KES 250,000 / mo",
    location: "Westlands, Nairobi",
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1920&auto=format&fit=crop",
    description:
      "A stunning penthouse with panoramic views of the Nairobi skyline. This unit features open-plan living, a private terrace, and access to a rooftop lounge and heated pool.",
    specs: { beds: 3, baths: 3, sqft: 2800, lot: "N/A", type: "Penthouse" },
    beds: 3,
    baths: 3,
    sqft: 2800,
    amenities: [
      "Rooftop Pool",
      "Elevator",
      "Gym",
      "CCTV",
      "Borehole",
      "Solar Water Heating",
    ],
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1920&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1920&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=1920&auto=format&fit=crop",
    ],
    status: "For Rent",
  },
  {
    id: 3,
    title: "Karen Exclusive Mansion",
    price: "KES 120,000,000",
    location: "Karen, Nairobi",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1920&auto=format&fit=crop",
    description:
      "Sitting on 1 acre of lush manicured gardens, this colonial-style mansion offers timeless elegance mixed with modern luxury. Includes a guest wing and long driveway.",
    specs: { beds: 6, baths: 7, sqft: 6500, lot: "1.0 Acre", type: "Mansion" },
    beds: 6,
    baths: 7,
    sqft: 6500,
    amenities: [
      "Guest Wing",
      "Mature Garden",
      "Fireplace",
      "Patio",
      "Electric Fence",
      "Staff Quarters",
    ],
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1920&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1920&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1920&auto=format&fit=crop",
    ],
    status: "For Sale",
  },

  // --- NEW PROPERTIES ---
  {
    id: 4,
    title: "Serene Lavington Townhouse",
    price: "KES 65,000,000",
    location: "Lavington, Nairobi",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1920&auto=format&fit=crop",
    description:
      "A contemporary townhouse in a gated community of 8 units. Features a private garden, modern kitchen, and excellent security.",
    specs: {
      beds: 4,
      baths: 5,
      sqft: 3200,
      lot: "0.1 Acres",
      type: "Townhouse",
    },
    beds: 4,
    baths: 5,
    sqft: 3200,
    amenities: [
      "Gated Community",
      "Private Garden",
      "DSQ",
      "Borehole",
      "Solar Heating",
    ],
    images: [
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1920&auto=format&fit=crop",
    ],
    status: "For Sale",
  },
  {
    id: 5,
    title: "The Marquis Kilimani",
    price: "KES 180,000 / mo",
    location: "Kilimani, Nairobi",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1920&auto=format&fit=crop",
    description:
      "High-floor apartment with city views. Walking distance to Yaya Centre. Fully furnished with modern amenities.",
    specs: { beds: 2, baths: 2, sqft: 1500, lot: "N/A", type: "Apartment" },
    beds: 2,
    baths: 2,
    sqft: 1500,
    amenities: [
      "Gym",
      "Swimming Pool",
      "Elevator",
      "Backup Generator",
      "Furnished",
    ],
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1920&auto=format&fit=crop",
    ],
    status: "For Rent",
  },
  {
    id: 6,
    title: "Muthaiga Colonial Estate",
    price: "KES 250,000,000",
    location: "Muthaiga, Nairobi",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1920&auto=format&fit=crop",
    description:
      "One of the most prestigious addresses in Nairobi. This historic home sits on 2 acres of indigenous forest borders.",
    specs: { beds: 7, baths: 8, sqft: 8000, lot: "2.0 Acres", type: "Mansion" },
    beds: 7,
    baths: 8,
    sqft: 8000,
    amenities: [
      "Forest View",
      "Guest House",
      "Swimming Pool",
      "Tennis Court",
      "Guard House",
    ],
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1920&auto=format&fit=crop",
    ],
    status: "For Sale",
  },
  {
    id: 7,
    title: "Riverside Duplex Apartment",
    price: "KES 45,000,000",
    location: "Riverside, Nairobi",
    image:
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?q=80&w=1920&auto=format&fit=crop",
    description:
      "Split-level luxury living near the German Embassy. Features double-volume ceilings and a large balcony.",
    specs: { beds: 3, baths: 4, sqft: 2800, lot: "N/A", type: "Apartment" },
    beds: 3,
    baths: 4,
    sqft: 2800,
    amenities: [
      "Clubhouse",
      "Swimming Pool",
      "Gym",
      "Intercom",
      "Panic Button",
    ],
    images: [
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?q=80&w=1920&auto=format&fit=crop",
    ],
    status: "For Sale",
  },
  {
    id: 8,
    title: "Gigiri Diplomatic Villa",
    price: "USD 4,500 / mo",
    location: "Gigiri, Nairobi",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a862aa8df?q=80&w=1920&auto=format&fit=crop",
    description:
      "UN-approved security standards. This standalone villa is perfect for expatriates working at the UN or embassies.",
    specs: { beds: 5, baths: 5, sqft: 4000, lot: "0.5 Acres", type: "Villa" },
    beds: 5,
    baths: 5,
    sqft: 4000,
    amenities: [
      "UN Approved",
      "Safe Haven",
      "Electric Fence",
      "Generator",
      "Large Garden",
    ],
    images: [
      "https://images.unsplash.com/photo-1600607687920-4e2a862aa8df?q=80&w=1920&auto=format&fit=crop",
    ],
    status: "For Rent",
  },
  {
    id: 9,
    title: "Lower Kabete Zen House",
    price: "KES 110,000,000",
    location: "Lower Kabete, Nairobi",
    image:
      "https://images.unsplash.com/photo-1598228723793-52759bba239c?q=80&w=1920&auto=format&fit=crop",
    description:
      "Designed by an award-winning architect, this home blends nature with concrete and wood textures.",
    specs: { beds: 4, baths: 4, sqft: 3800, lot: "0.5 Acres", type: "Villa" },
    beds: 4,
    baths: 4,
    sqft: 3800,
    amenities: [
      "Koi Pond",
      "Home Office",
      "Skylights",
      "Solar Power",
      "Rainwater Harvesting",
    ],
    images: [
      "https://images.unsplash.com/photo-1598228723793-52759bba239c?q=80&w=1920&auto=format&fit=crop",
    ],
    status: "For Sale",
  },
  {
    id: 10,
    title: "Kileleshwa Garden Apartment",
    price: "KES 22,000,000",
    location: "Kileleshwa, Nairobi",
    image:
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1920&auto=format&fit=crop",
    description:
      "Spacious 3-bedroom apartment with a dedicated DSQ. Quiet neighborhood with easy access to Kasuku Center.",
    specs: { beds: 3, baths: 3, sqft: 2100, lot: "N/A", type: "Apartment" },
    beds: 3,
    baths: 3,
    sqft: 2100,
    amenities: ["Children's Play Area", "Borehole", "High Speed Lifts", "CCTV"],
    images: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=1920&auto=format&fit=crop",
    ],
    status: "For Sale",
  },
  {
    id: 11,
    title: "Nyari Security Estate",
    price: "KES 350,000 / mo",
    location: "Nyari, Nairobi",
    image:
      "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?q=80&w=1920&auto=format&fit=crop",
    description:
      " located in the ultra-secure Nyari estate. Great community for families with expats.",
    specs: { beds: 5, baths: 4, sqft: 4200, lot: "0.5 Acres", type: "Villa" },
    beds: 5,
    baths: 4,
    sqft: 4200,
    amenities: [
      "Clubhouse Access",
      "Lake View",
      "Jogging Track",
      "Pet Friendly",
    ],
    images: [
      "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?q=80&w=1920&auto=format&fit=crop",
    ],
    status: "For Rent",
  },
  {
    id: 12,
    title: "Thigiri Ridge Mansion",
    price: "KES 145,000,000",
    location: "Thigiri, Nairobi",
    image:
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=1920&auto=format&fit=crop",
    description:
      "Classic architecture meeting modern needs. Near the New Muthaiga Shopping Mall.",
    specs: {
      beds: 6,
      baths: 6,
      sqft: 5500,
      lot: "0.75 Acres",
      type: "Mansion",
    },
    beds: 6,
    baths: 6,
    sqft: 5500,
    amenities: [
      "Swimming Pool",
      "Gazebo",
      "Entertainment Area",
      "3 Staff Quarters",
    ],
    images: [
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=1920&auto=format&fit=crop",
    ],
    status: "For Sale",
  },
  {
    id: 13,
    title: "Spring Valley Executive Home",
    price: "KES 90,000,000",
    location: "Spring Valley, Nairobi",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1920&auto=format&fit=crop",
    description:
      "Tucked away in a cul-de-sac, offering privacy and tranquility. Features hardwood floors and a fireplace.",
    specs: { beds: 4, baths: 4, sqft: 3600, lot: "0.4 Acres", type: "Villa" },
    beds: 4,
    baths: 4,
    sqft: 3600,
    amenities: ["Fireplace", "Mature Trees", "Generator", "Double Garage"],
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1920&auto=format&fit=crop",
    ],
    status: "For Sale",
  },
  {
    id: 14,
    title: "Westlands Luxury Studio",
    price: "KES 8,500,000",
    location: "Westlands, Nairobi",
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1920&auto=format&fit=crop",
    description:
      "Perfect investment property for Airbnb. High ROI potential. Located near Sarit Centre.",
    specs: { beds: 1, baths: 1, sqft: 600, lot: "N/A", type: "Apartment" },
    beds: 1,
    baths: 1,
    sqft: 600,
    amenities: ["Roof Deck", "Gym", "Concierge", "Coffee Shop"],
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1920&auto=format&fit=crop",
    ],
    status: "For Sale",
  },
  {
    id: 15,
    title: "Parklands Family Apartment",
    price: "KES 18,000,000",
    location: "Parklands, Nairobi",
    image:
      "https://images.unsplash.com/photo-1484154218962-a1c002085d2f?q=80&w=1920&auto=format&fit=crop",
    description:
      "Spacious 4 bedroom apartment near Aga Khan Hospital. Ideal for large families.",
    specs: { beds: 4, baths: 3, sqft: 2400, lot: "N/A", type: "Apartment" },
    beds: 4,
    baths: 3,
    sqft: 2400,
    amenities: [
      "Prayer Room",
      "Community Hall",
      "2 Parking Spots",
      "Water Tanks",
    ],
    images: [
      "https://images.unsplash.com/photo-1484154218962-a1c002085d2f?q=80&w=1920&auto=format&fit=crop",
    ],
    status: "For Sale",
  },
  {
    id: 16,
    title: "Rosslyn Lone Tree Estate",
    price: "KES 400,000 / mo",
    location: "Rosslyn, Nairobi",
    image:
      "https://images.unsplash.com/photo-1599809275372-b7f57385798a?q=80&w=1920&auto=format&fit=crop",
    description:
      "Close to the UN and Village Market. This property offers a countryside feel within the city.",
    specs: { beds: 5, baths: 5, sqft: 4800, lot: "0.6 Acres", type: "Villa" },
    beds: 5,
    baths: 5,
    sqft: 4800,
    amenities: ["Verandah", "Rolling Lawns", "Electric Gate", "Inverter"],
    images: [
      "https://images.unsplash.com/photo-1599809275372-b7f57385798a?q=80&w=1920&auto=format&fit=crop",
    ],
    status: "For Rent",
  },
  {
    id: 17,
    title: "Windy Ridge Karen Cottage",
    price: "KES 150,000 / mo",
    location: "Karen, Nairobi",
    image:
      "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=1920&auto=format&fit=crop",
    description:
      "Charming cottage on a shared compound. Very private and surrounded by trees.",
    specs: { beds: 2, baths: 2, sqft: 1200, lot: "Shared", type: "Townhouse" },
    beds: 2,
    baths: 2,
    sqft: 1200,
    amenities: [
      "Fireplace",
      "Garden Maintenance",
      "Security Included",
      "Verandah",
    ],
    images: [
      "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=1920&auto=format&fit=crop",
    ],
    status: "For Rent",
  },
  {
    id: 18,
    title: "Peponi Road Lakeview",
    price: "KES 210,000,000",
    location: "Kitisuru, Nairobi",
    image:
      "https://images.unsplash.com/photo-1510627489930-0c1b0dc58e85?q=80&w=1920&auto=format&fit=crop",
    description:
      "Magnificent views of the dam. This house is built for entertaining.",
    specs: { beds: 6, baths: 7, sqft: 7000, lot: "1.0 Acre", type: "Mansion" },
    beds: 6,
    baths: 7,
    sqft: 7000,
    amenities: ["Infinity Pool", "Party Area", "Sauna", "Wine Cellar"],
    images: [
      "https://images.unsplash.com/photo-1510627489930-0c1b0dc58e85?q=80&w=1920&auto=format&fit=crop",
    ],
    status: "For Sale",
  },
  {
    id: 19,
    title: "Kilimani Sky Loft",
    price: "KES 28,000,000",
    location: "Kilimani, Nairobi",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1920&auto=format&fit=crop",
    description:
      "New York style loft apartment in Nairobi. High ceilings and industrial chic finishes.",
    specs: { beds: 2, baths: 2, sqft: 1800, lot: "N/A", type: "Penthouse" },
    beds: 2,
    baths: 2,
    sqft: 1800,
    amenities: [
      "Keyless Entry",
      "Smart Lighting",
      "Rooftop Gym",
      "Co-working Space",
    ],
    images: [
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1920&auto=format&fit=crop",
    ],
    status: "For Sale",
  },
  {
    id: 20,
    title: "Lavington Green Villa",
    price: "KES 72,000,000",
    location: "Lavington, Nairobi",
    image:
      "https://images.unsplash.com/photo-1575517111839-3a3843ee7f5d?q=80&w=1920&auto=format&fit=crop",
    description:
      "Walking distance to Lavington Mall. A perfect family home in a secure compound.",
    specs: { beds: 5, baths: 5, sqft: 3500, lot: "0.15 Acres", type: "Villa" },
    beds: 5,
    baths: 5,
    sqft: 3500,
    amenities: [
      "Swimming Pool",
      "Kids Play Area",
      "Clubhouse",
      "Electric Fence",
    ],
    images: [
      "https://images.unsplash.com/photo-1575517111839-3a3843ee7f5d?q=80&w=1920&auto=format&fit=crop",
    ],
    status: "For Sale",
  },
];
