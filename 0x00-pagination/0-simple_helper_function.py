#!/usr/bin/env python3
"""contain a function named index_range that takes two integer 
arguments page and page_size. """


from typing import Tuple


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """
    Page numbers are 1-indexed, i.e. the first page is page 1.
    """
    index = page * page_size - page_size
    index_ = index + page_size
    return (index, index_)