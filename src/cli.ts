#!/usr/bin/env node
import cpImage from './index';

const [, , filepath] = process.argv;

cpImage(filepath);
