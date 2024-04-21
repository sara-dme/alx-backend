#!/usr/bin/env python3
"""basic catching module"""

BaseCaching = __import__('base_caching').BaseCaching


class BasicCache(BaseCaching):
    """ __doc doc"""

    def __init__(self):
        """doc doc doc"""
        super().__init__()

    def put(self, key, item):
        """doc doc doc"""
        if key is None or item is None:
            pass
        else:
            self.cache_data[key] = item

    def get(self, key):
        """doc doc doc doc """
        if key is None or key not in self.cache_data.keys():
            return None
        return self.cache_data.get(key)
