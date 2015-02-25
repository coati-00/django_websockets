#!/usr/bin/env python
import os
import sys

'''
./ve/bin/python -c "import swampdragon"
./ve/bin/python server.py
'''

from swampdragon.swampdragon_server import run_server

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "django_websockets.settings")

host_port = sys.argv[1] if len(sys.argv) > 1 else None

run_server(host_port=host_port)