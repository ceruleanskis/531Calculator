# pylint: skip-file
def pytest_itemcollected(item):
    par = item.parent.obj
    node = item.obj
    suf = node.__doc__.strip() if node.__doc__ else ''
    if suf:
        item._nodeid = suf