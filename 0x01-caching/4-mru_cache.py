#!/usr/bin/env python3
"""Module doc
"""


BaseCaching = __import__('base_caching').BaseCaching


class MRUCache(BaseCaching):
    """class doc
    """

    def __init__(self):
        """doc doc
        """
        super().__init__()
        self.usedKeys = []

    def put(self, key, item):
        """method doc
        """
        if key is not None and item is not None:
            self.cache_data[key] = item
            if key not in self.usedKeys:
                self.usedKeys.append(key)
            else:
                self.usedKeys.append(
                    self.usedKeys.pop(self.usedKeys.index(key)))
            if len(self.usedKeys) > BaseCaching.MAX_ITEMS:
                discard = self.usedKeys.pop(-2)
                del self.cache_data[discard]
                print('DISCARD: {:s}'.format(discard))

    def get(self, key):
        """method doc
        """
        if key is not None and key in self.cache_data.keys():
            self.usedKeys.append(self.usedKeys.pop(self.usedKeys.index(key)))
            return self.cache_data.get(key)
        return None