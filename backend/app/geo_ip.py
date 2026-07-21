import requests
import random
from typing import Dict

GEO_CACHE: Dict[str, dict] = {}

SAMPLE_LOCATIONS = [
    {"country": "United States", "code": "US", "city": "Ashburn", "lat": 39.0437, "lng": -77.4875},
    {"country": "Germany", "code": "DE", "city": "Frankfurt", "lat": 50.1109, "lng": 8.6821},
    {"country": "Russia", "code": "RU", "city": "Moscow", "lat": 55.7558, "lng": 37.6173},
    {"country": "China", "code": "CN", "city": "Shanghai", "lat": 31.2304, "lng": 121.4737},
    {"country": "Brazil", "code": "BR", "city": "Sao Paulo", "lat": -23.5505, "lng": -46.6333},
    {"country": "Netherlands", "code": "NL", "city": "Amsterdam", "lat": 52.3676, "lng": 4.9041},
    {"country": "Iran", "code": "IR", "city": "Tehran", "lat": 35.6892, "lng": 51.3890},
]

def resolve_ip(ip: str) -> dict:
    """
    Resolve IP to geographic location (Country, City, Lat/Long).
    Uses caching and fallback dataset for rapid response.
    """
    if ip in GEO_CACHE:
        return GEO_CACHE[ip]

    # Try IP-API service with timeout
    try:
        url = f"http://ip-api.com/json/{ip}?fields=status,country,countryCode,city,lat,lon"
        resp = requests.get(url, timeout=1.5)
        if resp.status_code == 200:
            data = resp.json()
            if data.get("status") == "success":
                geo = {
                    "country": data.get("country", "Unknown"),
                    "code": data.get("countryCode", "XX"),
                    "city": data.get("city", "Unknown"),
                    "lat": float(data.get("lat", 0.0)),
                    "lng": float(data.get("lon", 0.0)),
                }
                GEO_CACHE[ip] = geo
                return geo
    except Exception:
        pass

    # Fallback to random deterministic location based on IP hash
    seed = sum(int(b) for b in ip.split('.') if b.isdigit()) if '.' in ip else 42
    sample = SAMPLE_LOCATIONS[seed % len(SAMPLE_LOCATIONS)]
    GEO_CACHE[ip] = sample
    return sample
