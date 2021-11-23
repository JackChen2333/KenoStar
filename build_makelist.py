#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""

$File     : build_makelist.py
$Date     : Wednesday, April  4, 2018
$Revision : 
$Note     : Build makelist from "index.html"
$Creator  : Xuan Qu
$Notice   : (C) Copyright 2014 by Xuan Qu, Inc. All Rights Reserved.
"""

import os

sourceFileName = "index.html"
targetFileName = "makelist"

sourceFile = open(sourceFileName, "r")
# print "Reading from : ", sourceFile.name


if os.path.isfile(targetFileName):
	os.remove(targetFileName)
targetFile = open(targetFileName, "w")

line = sourceFile.readline()
while line:
	# print "Read line : %s" % (line)
	s = line.rstrip()
	# print "Read line after : %s" % (s)
	if s.startswith("<script"):
		startIndex = s.find("src=") + 4
		endIndex = s.find("></script>")
		fileName = s[startIndex:endIndex]
		# print fileName
		fileName = fileName.replace('/', '\\')
		targetFile.write(fileName + '\n')
		
	line = sourceFile.readline()

sourceFile.close()
targetFile.close()

# print "Building File --> " + targetFileName + ", Done"
