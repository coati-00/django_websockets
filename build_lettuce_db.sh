#!/bin/bash
rm -f lettuce.db
./manage.py syncdb --migrate --noinput --settings=django_websockets.settings_lettuce
mv lettuce.db test_data/test.db
