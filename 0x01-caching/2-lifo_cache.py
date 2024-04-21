#!/usr/bin/env python3
"""Module doc
"""


BaseCaching = __import__('base_caching').BaseCaching


class LIFOCache(BaseCaching):
    """calss doc
    """

    def __init__(self):
        """doc doc doc
        """
        super().__init__()

    def put(self, key, item):
        """method doc doc
        """
        if key is None or item is None:
            pass
        else:
            if len(self.cache_data) >= BaseCaching.MAX_ITEMS \
                    and key not in self.cache_data.keys():
                # delete the last item in the dictionary
                last_key, last_value = self.cache_data.popitem()
                print("DISCARD: {}". format(last_key))

            self.cache_data[key] = item

    def get(self, key):
        """method doc doc
        """
        if key is None or key not in self.cache_data.keys():
            return None
        return self.cache_data.get(key)
