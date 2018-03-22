#!/bin/bash
WRKDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
if [ $# = 0 ]; then
  echo "Usage: start.sh [--dev|--prod]"
elif [ "$1" = "--dev" ]; then
   export NODE_ENV=development
elif [ "$1" = "--prod" ]; then
   export NODE_ENV=production
else
  echo "Usage: start.sh [--dev|--prod]"
fi

 forever start --pidFile ~/.forever/pids/app.pid $WRKDIR/server/index.js