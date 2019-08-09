const _debug = require('debug');
const cachedFetchDebug = _debug('cachedFetchDebug');
const fetch = require('isomorphic-unfetch');
const fs = require('fs');
const differenceInMinutes = require('date-fns/difference_in_minutes')

const {
  CACHE_FILE,
  CACHE_EXPIRY,
} = require('./constants');

const cachedFetch = async (cacheKey, ...args) => {
  const cache_file = `${CACHE_FILE}_${cacheKey}`;

  const makeRequestAndSave = async () => {
    cachedFetchDebug(`Making a request to ${args[0]}...`);
    const response = await fetch(...args).then(res => res.json());
    cachedFetchDebug(`Request done`);

    cachedFetchDebug(`Saving request to cache...`);
    new Promise((resolve, reject) => {
      try {
        fs.writeFile(cache_file, JSON.stringify(response), (err) => {
          if (err) {
            reject(err);
          }

          cachedFetchDebug(`Saved request to cache`);
          resolve();
        });
      } catch (error) {
        reject(error);
      }
    });

    return response;
  }

  const readFromCache = async () => {
    cachedFetchDebug('Reading from cache...');

    const response = await new Promise((resolve, reject) => {
      fs.readFile(cache_file, 'utf8', function(err, contents) {
        if (err) {
          reject(err);
        }

        try {
          resolve(JSON.parse(contents));
        } catch (error) {
          reject(error);
        }
      });
    });

    cachedFetchDebug('Retrieved response from cache');

    return response;
  }

  let stats = {};

  try {
    stats = await new Promise((resolve, reject) => {
      fs.stat(cache_file, (err, stats) => {
        if (err) {
          reject(err);
        }

        resolve(stats);
      });
    });
  } catch (error) {
    cachedFetchDebug(`Cache file doesn't exist. Falling back to request...`);

    return {
      response: await makeRequestAndSave(),
      modifyDate: new Date()
    };
  }

  const modifyDate = new Date(stats.mtime);
  const diff = differenceInMinutes(new Date(), modifyDate);

  if (diff > CACHE_EXPIRY) {
    try {
      cachedFetchDebug(`Cache is ${diff} minutes old. Falling back to request...`);
      return {
        response: await makeRequestAndSave(),
        modifyDate: new Date()
      };
    } catch (error) {
      cachedFetchDebug('Making a request failed. Falling back to cache');
      return {
        response: await readFromCache(),
        modifyDate: modifyDate
      };
    }
  }

  try {
    return {
      response: await readFromCache(),
      modifyDate: modifyDate
    };
  } catch (error) {
    cachedFetchDebug('Reading from cache failed. Falling back to request');

    return {
      response: await makeRequestAndSave(),
      modifyDate: new Date()
    };
  }
}

module.exports = { cachedFetch }
