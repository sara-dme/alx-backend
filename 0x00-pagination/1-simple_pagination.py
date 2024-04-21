#!/usr/bin/env python3
""" doc doc do c doc"""

from typing import Tuple, List
import csv
import math


class Server:
    """ server class __"""
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """
        doc doc doc doc
        """
        assert type(page_size) is int and page_size > 0
        assert type(page) is int and page > 0
        dt = self.dataset()
        try:
            start, end = index_range(page, page_size)
            return dt[start:end]
        except IndexError:
            return []


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """doc cdoc doc """
    index = page * page_size - page_size
    index_1 = index + page_size
    return (index, index_1)
